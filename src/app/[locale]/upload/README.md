# Project Upload Form - Architecture

This directory contains the project upload form with a clean, maintainable architecture following separation of concerns principles.

## Directory Structure

```
upload/
├── hooks/
│   ├── useFormSubmission.ts      # Form submission logic & validation
│   └── useInteractionTracking.ts # User interaction tracking for bot detection
├── project-upload-form.tsx        # Main form component (UI only)
├── types.ts                       # TypeScript types & Zod schema
├── utils.ts                       # Utility functions & validators
├── page.tsx                       # Next.js page wrapper
└── footerUpload.tsx              # Footer component
```

## Architecture Principles

### 1. Separation of Concerns

Each file has a single, well-defined responsibility:

- **`types.ts`** - Type definitions and validation schemas
- **`utils.ts`** - Pure utility functions (no side effects)
- **`hooks/`** - React hooks for stateful logic
- **`project-upload-form.tsx`** - UI presentation only

### 2. Custom Hooks

#### `useFormSubmission`
Handles all form submission logic:
- Honeypot validation
- Timing validation
- Math question validation
- Interaction count validation
- API submission
- Error handling

#### `useInteractionTracking`
Tracks user interactions to detect bot behavior:
- Click events
- Keyboard events
- Mouse movement
- Returns interaction count

### 3. Utility Functions

All validation logic is extracted into pure functions:

- `generateMathQuestion()` - Creates random math questions
- `validateSubmissionTiming()` - Checks if form was submitted too quickly
- `validateMathAnswer()` - Verifies math answer
- `validateInteractionCount()` - Ensures sufficient user interaction
- `checkHoneypot()` - Detects bot submissions

### 4. Type Safety

- Zod schema for runtime validation
- TypeScript interfaces for compile-time safety
- Proper type exports for reusability

## Bot Prevention Features

### 1. Honeypot Field
Hidden field that bots typically fill out but humans don't see.

### 2. Timing Validation
Prevents submissions that happen too quickly (< 3 seconds).

### 3. Math CAPTCHA
Simple math question that's easy for humans but requires logic for bots.

### 4. Interaction Tracking
Monitors user interactions (clicks, typing, mouse movement).
Real users interact naturally; bots typically don't.

### 5. Multi-Layer Validation
All validations must pass for successful submission.

## Usage Example

```typescript
import { ProjectUploadForm } from "./project-upload-form";

export default function UploadPage() {
  return <ProjectUploadForm />;
}
```

## Adding New Validations

1. Add validation function to `utils.ts`:
```typescript
export function validateNewRule(data: unknown): { valid: boolean; message?: string } {
  // Your validation logic
  return { valid: true };
}
```

2. Use in `useFormSubmission` hook:
```typescript
const validation = validateNewRule(data);
if (!validation.valid) {
  setTimeWarning(validation.message || "");
  return;
}
```

## Testing

Each utility function is pure and easily testable:

```typescript
import { validateMathAnswer } from "./utils";

test("validates correct math answer", () => {
  const result = validateMathAnswer("5", 5);
  expect(result.valid).toBe(true);
});
```

## Benefits of This Architecture

1. **Maintainability** - Each file has a single responsibility
2. **Testability** - Pure functions are easy to test
3. **Reusability** - Hooks and utilities can be reused
4. **Readability** - Clear separation makes code easy to understand
5. **Scalability** - Easy to add new features without breaking existing code

## Future Improvements

- [ ] Add unit tests for utility functions
- [ ] Add integration tests for hooks
- [ ] Extract API client to separate service
- [ ] Add success/error toast notifications
- [ ] Implement form state persistence (localStorage)
- [ ] Add file upload progress indicators
