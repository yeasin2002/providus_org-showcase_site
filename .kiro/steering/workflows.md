# ICSA User Flows & Workflows

## Complete User Journey

### Overview
This document details all user flows and automated workflows in the ICSA Showcase Site (voices.icsa.church).

**Note:** The church join and project submission flows happen on the landing site (icsa.church) and are NOT part of this codebase. This site handles display and admin review only.

---

## Public User Flows

### Flow 1: Browse Projects
**Actor:** Public visitor

**Steps:**
1. Visit `voices.icsa.church`
2. See grid of approved project cards
3. Scroll through projects (lazy loading)
4. Filter/search (if implemented)
5. Click on a project card

**Result:** Navigate to project detail page

**Data Access:**
- Read projects where `status = 'approved'` AND `archived = false`
- No authentication required
- No personal data exposed

---

### Flow 2: View Project Details
**Actor:** Public visitor

**Steps:**
1. Click project card from showcase grid
2. View full project page with:
   - Church name and country
   - Full mission description
   - High-quality photo
   - Video player (if available)
   - Contact link (if provided)
3. Optionally click contact link
4. Optionally view certificate (if link provided)

**Result:** Full project information displayed

**Data Access:**
- Read single project by ID where `status = 'approved'`
- Read related church info (name, country only)
- No email or private data shown

---

### Flow 3: Verify Certificate
**Actor:** Public visitor (donor, partner, or church)

**Steps:**
1. Visit `voices.icsa.church/certificate/[cert-id]`
   - Or enter certificate ID on verification page
2. System validates certificate ID
3. If valid:
   - Display certificate details
   - Show church name, project title
   - Show issue date
   - Provide download link to PDF
   - Link to public project page
4. If invalid:
   - Show error message
   - Suggest checking ID or contacting support

**Result:** Certificate verified or error shown

**Data Access:**
- Read certificate by `certificate_id`
- Read related project and church info
- Public access (no auth required)

---

## Church User Flows (via Private Link)

### Flow 4: Church Manages Projects
**Actor:** Church representative (via private link)

**Steps:**
1. Access private link from welcome email
2. View church's project dashboard showing:
   - Active projects (approved + pending)
   - Project count (X of 5 active)
   - Monthly submission count (X of 3 this month)
   - Option to add new project
   - Option to archive/delete existing projects
3. If at limit, see message explaining:
   - "You have 5 active projects (maximum reached)"
   - "Archive or delete a project to add a new one"
4. If monthly limit reached:
   - "You've submitted 3 projects this month (maximum reached)"
   - "You can submit more projects starting [next month date]"

**Result:** Church can manage their project portfolio

**Data Access:**
- Read projects where `church_id = [church_id]`
- Update/archive own projects only
- Token-based authentication

### Flow 5: Church Submits New Project
**Actor:** Church representative (via private link)

**Steps:**
1. Click "Add New Project" button
2. System validates:
   - Active project count < 5
   - Monthly submission count < 3
3. If validation passes:
   - Show project submission form
   - Fill in project details
   - Upload photo and optional video
   - Submit project
4. If validation fails:
   - Show error message with specific reason
   - Suggest actions (archive project or wait)

**Result:** New project created or error shown

**Validation:**
- Check active projects: `COUNT(status IN ['approved', 'pending'] AND archived = false) < 5`
- Check monthly limit: `monthly_submission_count < 3`
- Increment monthly counter on successful submission

### Flow 6: Church Archives/Deletes Project
**Actor:** Church representative (via private link)

**Steps:**
1. View list of own projects
2. Click "Archive" or "Delete" button on a project
3. Confirm action with warning:
   - "This will remove the project from public view"
   - "You can add a new project after archiving"
4. System updates project:
   - Set `archived = true`
   - Set `archived_at = NOW()`
   - Set `deleted_by_church = true`
5. Project removed from active count
6. Church can now submit new project (if under monthly limit)

**Result:** Project archived, slot freed for new project

**Data Access:**
- Update own projects only
- Cannot delete projects with certificates (optional rule)
- Media files remain in storage

---

## Admin Flows

### Flow 7: Admin Login
**Actor:** ICSA admin

**Steps:**
1. Visit `voices.icsa.church/admin`
2. See password prompt
3. Enter admin password
4. System validates password
5. If valid: Access admin dashboard
6. If invalid: Show error, allow retry

**Result:** Access to admin dashboard

**Security:**
- Password-protected route
- Session-based authentication
- No user accounts (single admin password)

---

### Flow 8: Review Pending Projects
**Actor:** ICSA admin (authenticated)

**Steps:**
1. Access admin dashboard at `/admin`
2. See list of pending projects with:
   - Thumbnail image
   - Church name
   - Country
   - Project title
   - Submission date
   - Church's active project count (X/5)
3. Use filters/search (optional):
   - Filter by country
   - Filter by date
   - Search by church name
4. Click on project to view details

**Result:** List of projects requiring review

**Data Access:**
- Read all projects where `status = 'pending'` AND `archived = false`
- Read related church info (including email)
- Admin-only access

---

### Flow 9: Approve Project
**Actor:** ICSA admin (authenticated)

**Steps:**
1. Open project detail in admin panel
2. Review content:
   - Read mission description
   - View photo and video
   - Check for inappropriate content
3. Optionally edit text (fix typos)
4. Preview how it will look on public site
5. Click "Approve" button
6. Confirm approval action

**Result:** Project published + automated workflow triggered

**Automated Actions (see Workflow A below):**
- Status updated to 'approved'
- Certificate PDF generated
- Certificate saved to storage
- Approval email sent
- Public site updated

---

### Flow 10: Reject Project
**Actor:** ICSA admin (authenticated)

**Steps:**
1. Open project detail in admin panel
2. Review content
3. Decide to reject
4. Click "Reject" button
5. Optionally add rejection reason
6. Confirm rejection

**Result:** Project stays hidden + optional email sent

**Automated Actions (see Workflow B below):**
- Status updated to 'rejected'
- Optional rejection email sent
- Project remains hidden from public
- Media files kept but not accessible

---

### Flow 11: Edit Project Before Approval
**Actor:** ICSA admin (authenticated)

**Steps:**
1. Open project in admin panel
2. Click "Edit" button
3. Make minor text changes:
   - Fix typos
   - Adjust formatting
   - Clarify wording
4. Cannot edit:
   - Photos or videos
   - Church name or country
5. Save changes
6. Preview updated version
7. Proceed to approve or continue editing

**Result:** Project text updated, ready for approval

**Data Access:**
- Update `projects` table fields:
  - `project_title`
  - `mission_description`
  - `contact_link`
- Cannot update media URLs or church info

---

### Flow 12: Unpublish Approved Project
**Actor:** ICSA admin (authenticated)

**Steps:**
1. View list of approved projects in admin
2. Find project to unpublish
3. Click "Unpublish" button
4. Confirm action
5. Optionally add reason (internal note)

**Result:** Project hidden from public view

**Actions:**
- Status changed: `approved` → `rejected` (or new status: `unpublished`)
- Project removed from public showcase
- Certificate remains valid (not revoked)
- No email sent to church (manual communication)

---

### Flow 13: Bulk Actions (Nice-to-have)
**Actor:** ICSA admin (authenticated)

**Steps:**
1. View pending projects list
2. Select multiple projects (checkboxes)
3. Choose bulk action:
   - Approve selected
   - Reject selected
4. Confirm bulk action
5. System processes each project

**Result:** Multiple projects processed at once

**Automated Actions:**
- Same as individual approve/reject
- Executed for each selected project
- Emails sent to each church
- Certificates generated for approvals

---

## Automated Workflows

### Workflow A: Project Approval
**Trigger:** Admin clicks "Approve" button

**Sequence:**

1. **Update Database**
   ```
   UPDATE projects SET
     status = 'approved',
     approved_at = NOW(),
     approved_by = [admin_identifier]
   WHERE id = [project_id]
   ```

2. **Generate Certificate ID**
   ```
   Format: CERT-YYYY-NNNNNN
   Example: CERT-2025-000123
   ```

3. **Create Certificate PDF**
   - Use PDF generation library (e.g., PDFKit, Puppeteer)
   - Template includes:
     - ICSA logo and branding
     - Certificate title: "ICSA Membership Certificate"
     - Church name
     - Project title
     - Certificate ID
     - Issue date (approval date)
     - Digital signature/seal
   - Save as: `cert-{certificate_id}.pdf`

4. **Upload Certificate to Supabase**
   ```
   Bucket: certificates/
   Path: cert-{certificate_id}.pdf
   Access: Public (via unique URL)
   ```

5. **Create Certificate Record**
   ```
   INSERT INTO certificates (
     certificate_id,
     church_id,
     project_id,
     file_url,
     issued_at
   ) VALUES (...)
   ```

6. **Send Approval Email via Brevo**
   - Template: Approval email
   - Recipient: Church contact email
   - Variables:
     - Church name
     - Project title
     - Public project URL
     - Certificate download URL
   - Attachment: Certificate PDF (optional)

7. **Revalidate Public Pages**
   - Trigger ISR revalidation for:
     - Home page (showcase grid)
     - Project detail page
   - Ensure immediate visibility (no cache delay)

8. **Log Action**
   - Record approval in admin logs
   - Track who approved and when

**Error Handling:**
- If PDF generation fails: Retry or alert admin
- If email fails: Log error, allow manual resend
- If database update fails: Rollback transaction

---

### Workflow B: Project Rejection
**Trigger:** Admin clicks "Reject" button

**Sequence:**

1. **Update Database**
   ```
   UPDATE projects SET
     status = 'rejected',
     rejection_reason = [optional_reason],
     updated_at = NOW()
   WHERE id = [project_id]
   ```

2. **Send Rejection Email (Optional)**
   - Template: Rejection email
   - Recipient: Church contact email
   - Variables:
     - Church name
     - Rejection reason (if provided)
     - Guidance on resubmission
   - Only sent if admin chooses to notify

3. **Keep Media Files**
   - Files remain in Supabase storage
   - Not deleted (may be resubmitted)
   - Not publicly accessible

4. **Log Action**
   - Record rejection in admin logs
   - Track who rejected and when
   - Store rejection reason

**Error Handling:**
- If email fails: Log error, continue
- If database update fails: Show error to admin

---

### Workflow C: Certificate Verification
**Trigger:** User visits certificate verification page

**Sequence:**

1. **Parse Certificate ID**
   - Extract from URL: `/certificate/[cert-id]`
   - Or from form input

2. **Query Database**
   ```
   SELECT c.*, p.project_title, ch.church_name
   FROM certificates c
   JOIN projects p ON c.project_id = p.id
   JOIN churches ch ON c.church_id = ch.id
   WHERE c.certificate_id = [cert_id]
   ```

3. **Validate Certificate**
   - Check if record exists
   - Check if project still approved
   - Check if certificate not revoked (future feature)

4. **Display Results**
   - If valid:
     - Show certificate details
     - Display verification badge
     - Provide PDF download link
     - Link to public project page
   - If invalid:
     - Show error message
     - Suggest checking ID
     - Provide contact info

**Error Handling:**
- Invalid ID format: Show format error
- Certificate not found: Show not found error
- Database error: Show generic error

---

### Workflow D: Project Submission Validation
**Trigger:** Church attempts to submit new project

**Sequence:**

1. **Identify Church**
   - Validate private link token
   - Get church ID from token
   - Check token expiration

2. **Check Monthly Submission Counter**
   ```
   SELECT monthly_submission_count, last_submission_reset
   FROM churches
   WHERE id = [church_id]
   ```
   - If last_submission_reset is in previous month:
     - Reset counter to 0
     - Update last_submission_reset to NOW()

3. **Count Active Projects**
   ```
   SELECT COUNT(*) FROM projects
   WHERE church_id = [church_id]
     AND status IN ('approved', 'pending')
     AND archived = FALSE
   ```

4. **Validate Limits**
   - If active_count >= 5:
     - Show error: "Maximum 5 active projects reached"
     - Suggest: "Archive or delete an existing project"
     - List current active projects
   - If monthly_count >= 3:
     - Show error: "Maximum 3 submissions this month"
     - Show: "You can submit more starting [next month date]"
     - Display current month's submissions

5. **Allow Submission**
   - If both checks pass:
     - Show project submission form
     - Allow file uploads
     - Process submission

6. **Increment Counter**
   - On successful submission:
     - Increment monthly_submission_count
     - Create project record with status = 'pending'

**Error Handling:**
- Invalid token: Redirect to error page
- Expired token: Show renewal message
- Database error: Show generic error, allow retry
- File upload error: Show specific error, keep form data

---

### Workflow E: Project Archival by Church
**Trigger:** Church clicks "Archive" or "Delete" button

**Sequence:**

1. **Validate Ownership**
   ```
   SELECT * FROM projects
   WHERE id = [project_id]
     AND church_id = [church_id]
   ```
   - If not found: Show error "Project not found"
   - If church_id mismatch: Show error "Unauthorized"

2. **Check Project Status**
   - If project has certificate:
     - Show warning: "This project has a certificate"
     - Require confirmation
   - If project is pending:
     - Show info: "This project is awaiting review"

3. **Archive Project**
   ```
   UPDATE projects SET
     archived = TRUE,
     archived_at = NOW(),
     deleted_by_church = TRUE
   WHERE id = [project_id]
   ```

4. **Update Church Dashboard**
   - Recalculate active project count
   - Show success message
   - Display updated project list
   - Show "Add New Project" button if now under limit

5. **Optional: Remove from Public**
   - If project was approved:
     - Remove from public showcase immediately
     - Revalidate public pages (ISR)
   - Certificate remains valid (not revoked)

**Error Handling:**
- Database error: Show error, allow retry
- Concurrent modification: Refresh and retry
- Media cleanup error: Log error, continue (cleanup later)

---

## Data Flow Diagrams

### Public Showcase Data Flow
```
User Request → Next.js Server
  ↓
Query Supabase (status = 'approved')
  ↓
Fetch project data + church info
  ↓
Fetch media URLs from storage
  ↓
Render page with optimized images
  ↓
Return HTML to user
```

### Admin Approval Data Flow
```
Admin clicks Approve
  ↓
Update project status in DB
  ↓
Generate certificate PDF
  ↓
Upload PDF to Supabase storage
  ↓
Create certificate record in DB
  ↓
Send email via Brevo API
  ↓
Revalidate public pages (ISR)
  ↓
Show success message to admin
```

### Certificate Verification Data Flow
```
User enters certificate ID
  ↓
Query certificates table
  ↓
Join with projects and churches
  ↓
Validate status and existence
  ↓
Fetch certificate PDF URL
  ↓
Display verification result
```

---

## State Transitions

### Project Status States
```
pending → approved (via admin approval)
pending → rejected (via admin rejection)
approved → rejected (via unpublish)
rejected → pending (via resubmission - future)
```

### Church Status States (managed by landing site)
```
joined → submitted (project form completed)
submitted → pending (admin review queue)
pending → approved (project approved)
pending → rejected (project rejected)
```

---

## Integration Points

### Supabase Integration
- **Database queries:** Read/write projects, churches, certificates
- **File storage:** Upload/download media and PDFs
- **Authentication:** Service role key for admin operations
- **Real-time:** Optional real-time updates for admin dashboard

### Brevo Email Integration
- **API endpoint:** Transactional email API
- **Templates:** Approval and rejection email templates
- **Variables:** Dynamic content (church name, URLs, etc.)
- **Tracking:** Delivery status and open rates (optional)

### Next.js ISR Integration
- **Revalidation:** Trigger on-demand revalidation after approval
- **Cache control:** Ensure fresh data for public pages
- **Static generation:** Pre-render approved projects

---

## Error Scenarios & Recovery

### Scenario 1: Email Fails After Approval
**Problem:** Project approved but email not sent

**Recovery:**
1. Admin sees error notification
2. Project remains approved (don't rollback)
3. Admin can manually resend email
4. Log error for debugging

### Scenario 2: PDF Generation Fails
**Problem:** Certificate PDF cannot be created

**Recovery:**
1. Show error to admin
2. Don't complete approval
3. Allow admin to retry
4. If persistent, approve without certificate (manual generation)

### Scenario 3: Database Connection Lost
**Problem:** Cannot save approval to database

**Recovery:**
1. Show error to admin
2. Don't proceed with workflow
3. Allow admin to retry
4. No partial state (transaction rollback)

### Scenario 4: File Upload Fails
**Problem:** Certificate PDF cannot upload to storage

**Recovery:**
1. Retry upload automatically (3 attempts)
2. If fails, save PDF locally
3. Alert admin to manual upload
4. Complete approval workflow

---

## Performance Considerations

### Approval Workflow Optimization
- Generate PDF asynchronously (don't block UI)
- Send email asynchronously
- Show success message immediately
- Background jobs for heavy tasks

### Public Page Loading
- Use ISR for fast page loads
- Lazy load images below fold
- Prefetch project details on hover
- CDN caching for media files

### Admin Dashboard Performance
- Paginate pending projects list
- Load thumbnails (not full images)
- Debounce search/filter inputs
- Cache admin session

---

## Configuration & Limits

### Adjustable Project Limits

These limits can be configured in the database or environment variables:

**Active Project Limit (per church):**
- Default: 5 projects
- Location: Database function `validate_project_limits()`
- Variable: `max_active_projects`
- To change: Update function or add to environment variables

**Monthly Submission Limit (per church):**
- Default: 3 submissions per month
- Location: Database function `validate_project_limits()`
- Variable: `max_monthly_submissions`
- To change: Update function or add to environment variables

**Implementation Options:**

Option 1: Database function (current)
```sql
DECLARE
  max_active_projects INTEGER := 5;
  max_monthly_submissions INTEGER := 3;
```

Option 2: Environment variables (recommended for flexibility)
```env
MAX_ACTIVE_PROJECTS=5
MAX_MONTHLY_SUBMISSIONS=3
```

Option 3: Admin configuration table (future enhancement)
```sql
CREATE TABLE system_config (
  key TEXT PRIMARY KEY,
  value INTEGER,
  description TEXT
);

INSERT INTO system_config VALUES
  ('max_active_projects', 5, 'Maximum active projects per church'),
  ('max_monthly_submissions', 3, 'Maximum submissions per month per church');
```

---

## Monitoring & Logging

### Events to Log
- Project approvals (who, when, project ID)
- Project rejections (who, when, reason)
- Project archival (church-initiated vs admin)
- Certificate generations (success/failure)
- Email sends (success/failure)
- Admin logins
- Limit violations (active project limit, monthly limit)
- Errors and exceptions

### Metrics to Track
- Approval rate (approved vs rejected)
- Average review time
- Email delivery rate
- Page load times
- Error rates
- Projects per church (distribution)
- Monthly submission patterns
- Archive/deletion rate

### Alerts to Configure
- Email delivery failures
- PDF generation failures
- Database connection issues
- High error rates
- Slow page loads
- Churches hitting limits frequently
- Unusual submission patterns
