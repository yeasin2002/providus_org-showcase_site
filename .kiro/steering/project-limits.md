# Project Submission Limits & Rules

## Overview

This document details the project submission limits and management rules for churches in the ICSA platform. These rules help control duplicate uploads, spam, and maintain data consistency.

---

## Church Identity Management

### Email-Based Identification

- **Primary Identifier:** Church email address
- **Uniqueness:** Each email address represents one unique church profile
- **Consistency:** The same email always connects to the same church profile
- **Access Method:** Churches access their profile via a unique private link (token-based)

### Why Email-Based?

- Simple and reliable identification
- No need for username/password management
- Churches already provide email during join process
- Easy to verify and communicate with

---

## Project Limits

### 1. Active Project Limit

**Rule:** Maximum 5 active projects per church

**What counts as "active":**
- Projects with status `approved` (visible on public site)
- Projects with status `pending` (awaiting admin review)

**What does NOT count:**
- Projects with `archived = true`
- Projects with status `rejected` (unless resubmitted)

**Enforcement:**
- Checked before allowing new project submission
- Database trigger validates on INSERT
- Frontend shows current count (e.g., "3 of 5 active projects")

**When limit is reached:**
- Church cannot submit new projects
- Must archive or delete an existing project first
- Clear error message with guidance shown

**Example:**
```
Church A has:
- 3 approved projects
- 2 pending projects
- 1 archived project

Active count: 5 (3 + 2)
Can submit new project: NO
Must archive one project first
```

---

### 2. Monthly Submission Limit

**Rule:** Maximum 3 new project submissions per month

**What counts:**
- Any new project submission (regardless of approval status)
- Counter increments on successful submission
- Counter resets automatically at start of each month

**Configurable:**
- Default: 3 submissions per month
- Can be adjusted via database configuration
- Different limits per church possible (future enhancement)

**Enforcement:**
- Checked before allowing new project submission
- Counter stored in `churches.monthly_submission_count`
- Reset date tracked in `churches.last_submission_reset`

**When limit is reached:**
- Church cannot submit new projects until next month
- Clear message shows: "You can submit more starting [date]"
- Shows current month's submission count

**Example:**
```
Church B in November 2025:
- Submitted 3 projects this month
- Monthly limit: 3
- Can submit new project: NO
- Next submission available: December 1, 2025
```

---

## Project Management by Churches

### Archiving Projects

**Purpose:** Free up slots for new projects without losing data

**How it works:**
1. Church views their project dashboard
2. Clicks "Archive" button on a project
3. Confirms action
4. Project marked as `archived = true`
5. Project no longer counts toward active limit
6. Church can now submit new project (if under monthly limit)

**What happens to archived projects:**
- Removed from public showcase (if approved)
- No longer visible in church's active projects
- Media files remain in storage
- Can be restored by admin (future feature)
- Certificate remains valid (if issued)

**Database changes:**
```sql
UPDATE projects SET
  archived = TRUE,
  archived_at = NOW(),
  deleted_by_church = TRUE
WHERE id = [project_id];
```

### Deleting Projects

**Implementation options:**

**Option 1: Soft Delete (Recommended)**
- Same as archiving
- Project marked as archived
- Data preserved for records
- Can be restored if needed

**Option 2: Hard Delete**
- Permanently remove project record
- Delete associated media files
- Cannot be restored
- Certificate handling needed

**Current implementation:** Soft delete (archiving)

---

## Validation Flow

### Before Project Submission

```
1. Church clicks "Add New Project"
   ↓
2. System validates private link token
   ↓
3. Check monthly submission counter
   - If in new month: Reset counter to 0
   ↓
4. Count active projects
   - Query: status IN ('approved', 'pending') AND archived = FALSE
   ↓
5. Validate limits
   - Active count < 5?
   - Monthly count < 3?
   ↓
6. If both pass: Show submission form
   If either fails: Show error with guidance
```

### Error Messages

**Active limit reached:**
```
You have 5 active projects (maximum reached)

To add a new project, please archive or delete one of your existing projects.

Your active projects:
- Project A (Approved)
- Project B (Approved)
- Project C (Pending review)
- Project D (Approved)
- Project E (Approved)

[View My Projects]
```

**Monthly limit reached:**
```
You've submitted 3 projects this month (maximum reached)

You can submit more projects starting December 1, 2025.

This month's submissions:
- Project X (submitted Nov 5)
- Project Y (submitted Nov 12)
- Project Z (submitted Nov 20)

[View My Projects]
```

---

## Database Implementation

### Churches Table Additions

```sql
ALTER TABLE churches ADD COLUMN IF NOT EXISTS
  monthly_submission_count INTEGER DEFAULT 0;

ALTER TABLE churches ADD COLUMN IF NOT EXISTS
  last_submission_reset TIMESTAMPTZ DEFAULT NOW();
```

### Projects Table Additions

```sql
ALTER TABLE projects ADD COLUMN IF NOT EXISTS
  archived BOOLEAN DEFAULT FALSE;

ALTER TABLE projects ADD COLUMN IF NOT EXISTS
  archived_at TIMESTAMPTZ;

ALTER TABLE projects ADD COLUMN IF NOT EXISTS
  deleted_by_church BOOLEAN DEFAULT FALSE;

CREATE INDEX IF NOT EXISTS idx_projects_archived 
  ON projects(archived);
```

### Database Triggers

**1. Reset Monthly Counter**
```sql
CREATE OR REPLACE FUNCTION check_and_reset_monthly_counter()
RETURNS TRIGGER AS $
BEGIN
  IF EXTRACT(MONTH FROM NEW.last_submission_reset) != EXTRACT(MONTH FROM NOW()) 
     OR EXTRACT(YEAR FROM NEW.last_submission_reset) != EXTRACT(YEAR FROM NOW()) THEN
    NEW.monthly_submission_count = 0;
    NEW.last_submission_reset = NOW();
  END IF;
  RETURN NEW;
END;
$ LANGUAGE plpgsql;
```

**2. Validate Project Limits**
```sql
CREATE OR REPLACE FUNCTION validate_project_limits()
RETURNS TRIGGER AS $
DECLARE
  active_count INTEGER;
  monthly_count INTEGER;
  max_active_projects INTEGER := 5;
  max_monthly_submissions INTEGER := 3;
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Count active projects
    SELECT COUNT(*) INTO active_count
    FROM projects
    WHERE church_id = NEW.church_id
      AND status IN ('approved', 'pending')
      AND archived = FALSE;
    
    IF active_count >= max_active_projects THEN
      RAISE EXCEPTION 'Maximum % active projects reached', max_active_projects;
    END IF;
    
    -- Check monthly limit
    SELECT monthly_submission_count INTO monthly_count
    FROM churches WHERE id = NEW.church_id;
    
    IF monthly_count >= max_monthly_submissions THEN
      RAISE EXCEPTION 'Maximum % submissions this month', max_monthly_submissions;
    END IF;
    
    -- Increment counter
    UPDATE churches
    SET monthly_submission_count = monthly_submission_count + 1
    WHERE id = NEW.church_id;
  END IF;
  
  RETURN NEW;
END;
$ LANGUAGE plpgsql;
```

---

## API Endpoints & Queries

### Check if Church Can Submit

```typescript
async function canChurchSubmitProject(churchId: string) {
  // Get church info
  const { data: church } = await supabase
    .from('churches')
    .select('monthly_submission_count, last_submission_reset')
    .eq('id', churchId)
    .single();
  
  // Count active projects
  const { count: activeCount } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true })
    .eq('church_id', churchId)
    .in('status', ['approved', 'pending'])
    .eq('archived', false);
  
  const MAX_ACTIVE = 5;
  const MAX_MONTHLY = 3;
  
  return {
    canSubmit: activeCount < MAX_ACTIVE && church.monthly_submission_count < MAX_MONTHLY,
    activeCount,
    monthlyCount: church.monthly_submission_count,
    maxActive: MAX_ACTIVE,
    maxMonthly: MAX_MONTHLY
  };
}
```

### Get Church's Active Projects

```typescript
const { data: projects } = await supabase
  .from('projects')
  .select('id, project_title, status, submitted_at, approved_at')
  .eq('church_id', churchId)
  .in('status', ['approved', 'pending'])
  .eq('archived', false)
  .order('created_at', { ascending: false });
```

### Archive Project

```typescript
const { data, error } = await supabase
  .from('projects')
  .update({
    archived: true,
    archived_at: new Date().toISOString(),
    deleted_by_church: true
  })
  .eq('id', projectId)
  .eq('church_id', churchId) // Ensure ownership
  .select()
  .single();
```

---

## Configuration

### Adjusting Limits

**Current defaults:**
- Active projects: 5
- Monthly submissions: 3

**To change limits:**

**Option 1: Environment Variables (Recommended)**
```env
MAX_ACTIVE_PROJECTS=5
MAX_MONTHLY_SUBMISSIONS=3
```

**Option 2: Database Function**
Update the `validate_project_limits()` function:
```sql
DECLARE
  max_active_projects INTEGER := 5;  -- Change this
  max_monthly_submissions INTEGER := 3;  -- Change this
```

**Option 3: Configuration Table (Future)**
```sql
CREATE TABLE system_config (
  key TEXT PRIMARY KEY,
  value INTEGER,
  description TEXT
);
```

---

## Admin Dashboard Enhancements

### Show Church Project Stats

When reviewing projects, admin should see:
- Church name
- Active projects: X of 5
- This month's submissions: X of 3
- Total approved projects (all time)

### Bulk Operations Considerations

When approving/rejecting multiple projects:
- Active count updates automatically
- Monthly counter already incremented on submission
- No additional validation needed

---

## Future Enhancements

### Per-Church Custom Limits

Allow different limits for different churches:
```sql
ALTER TABLE churches ADD COLUMN custom_max_active INTEGER;
ALTER TABLE churches ADD COLUMN custom_max_monthly INTEGER;
```

### Grace Period

Allow churches to exceed limits temporarily:
```sql
ALTER TABLE churches ADD COLUMN grace_period_until TIMESTAMPTZ;
```

### Archived Project Management

- Church can view archived projects
- Church can restore archived projects (if under limit)
- Admin can permanently delete archived projects
- Automatic cleanup of old archived projects

### Analytics

Track and display:
- Average projects per church
- Churches hitting limits frequently
- Monthly submission patterns
- Archive/deletion rates

---

## Testing Scenarios

### Test Case 1: Active Limit
1. Church has 4 active projects
2. Submit new project → Success
3. Now has 5 active projects
4. Try to submit another → Error shown
5. Archive one project
6. Try to submit again → Success

### Test Case 2: Monthly Limit
1. Church submits 3 projects in November
2. Try to submit 4th → Error shown
3. Wait until December 1
4. Counter resets automatically
5. Submit new project → Success

### Test Case 3: Combined Limits
1. Church has 5 active projects
2. Monthly count is 2
3. Archive one project (now 4 active)
4. Submit new project → Success (now 5 active, 3 monthly)
5. Try to submit another → Error (monthly limit)

### Test Case 4: Month Rollover
1. Church submits 3 projects on Nov 30
2. Monthly limit reached
3. On Dec 1, counter resets to 0
4. Can submit new projects again

---

## Security Considerations

### Prevent Abuse

- Rate limiting on submission endpoint
- Token expiration for private links
- Validate church ownership before archiving
- Log all limit violations
- Alert on suspicious patterns

### Data Integrity

- Database triggers enforce limits
- Frontend validation for UX
- Backend validation for security
- Transaction rollback on limit violation

---

## Support & Troubleshooting

### Common Issues

**Issue:** Church says they can't submit but should be under limit
- Check active project count in database
- Verify monthly counter hasn't stuck
- Check if month rollover happened
- Verify archived flag is set correctly

**Issue:** Monthly counter not resetting
- Check `last_submission_reset` timestamp
- Verify trigger is active
- Manually reset if needed

**Issue:** Archived projects still counting
- Check `archived` flag in database
- Verify query includes `archived = FALSE`
- Recount active projects

### Manual Overrides

Admin can manually adjust limits if needed:
```sql
-- Reset monthly counter
UPDATE churches 
SET monthly_submission_count = 0,
    last_submission_reset = NOW()
WHERE id = [church_id];

-- Archive project manually
UPDATE projects
SET archived = TRUE,
    archived_at = NOW()
WHERE id = [project_id];
```
