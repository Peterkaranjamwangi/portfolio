# Validation Guide - Zod & React Hook Form Integration

## Overview

This project now uses **Zod** for schema validation and **React Hook Form** for performant, type-safe form management. This addresses the **critical "No Input Validation" security issue** identified in the code review.

---

## What Was Implemented

### 1. Dependencies Installed

```json
{
  "zod": "^4.1.12",
  "react-hook-form": "^7.66.0",
  "@hookform/resolvers": "^5.2.2"
}
```

### 2. Centralized Validation Schemas

**Location:** `lib/validations/schemas.ts`

All validation logic is centralized in one file, ensuring consistency between frontend and backend.

#### Available Schemas:

| Schema | Purpose | Key Validations |
|--------|---------|----------------|
| `projectSchema` | Create projects | URL validation, string lengths, status enum |
| `projectUpdateSchema` | Update projects | Partial validation (all fields optional) |
| `skillSchema` | Create skills | Type enum (TECHNICAL/SOFT), icon name |
| `skillUpdateSchema` | Update skills | Partial validation |
| `serviceSchema` | Create services | Description length (max 1000 chars) |
| `serviceUpdateSchema` | Update services | Partial validation |
| `technologySchema` | Create technologies | Proficiency 0-100, category enum, URL |
| `technologyUpdateSchema` | Update technologies | Partial validation |
| `postSchema` | Create blog posts | Slug regex, content required, author ID |
| `postUpdateSchema` | Update blog posts | Partial validation (no authorId) |

#### TypeScript Types Exported:

```typescript
export type ProjectFormData = z.infer<typeof projectSchema>;
export type SkillFormData = z.infer<typeof skillSchema>;
export type ServiceFormData = z.infer<typeof serviceSchema>;
export type TechnologyFormData = z.infer<typeof technologySchema>;
export type PostFormData = z.infer<typeof postSchema>;
```

These types are automatically inferred from Zod schemas, ensuring type safety.

---

## Backend API Validation

### How It Works

All API routes now validate incoming data **before** database operations:

```typescript
// Example: app/api/skills/route.ts
import { skillSchema } from '@/lib/validations/schemas';

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Validate with Zod
  const validated = skillSchema.safeParse(body);

  if (!validated.success) {
    return NextResponse.json(
      {
        error: 'Validation failed',
        details: validated.error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message,
        }))
      },
      { status: 400 }
    );
  }

  // Use validated data (fully type-safe)
  const skill = await prisma.skill.create({
    data: validated.data,
  });
}
```

### Updated API Routes

All the following routes now have Zod validation:

✅ **Projects:**
- `POST /api/projects` - Creates project with technology relations
- `PATCH /api/projects/[id]` - Updates project fields

✅ **Skills:**
- `POST /api/skills` - Creates skill with type validation
- `PATCH /api/skills/[id]` - Updates skill fields

✅ **Services:**
- `POST /api/services` - Creates service with description limits
- `PATCH /api/services/[id]` - Updates service fields

✅ **Technologies:**
- `POST /api/technologies` - Creates technology with proficiency range
- `PATCH /api/technologies/[id]` - Updates technology fields

### Error Response Format

When validation fails, the API returns:

```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "name",
      "message": "Name is required"
    },
    {
      "field": "value",
      "message": "Proficiency must be between 0-100"
    }
  ]
}
```

---

## Frontend Form Validation

### Example: Skills Form with React Hook Form

**Location:** `app/admin/dashboard/skills-new/page.tsx`

This is a **complete example** showing how to integrate React Hook Form with Zod validation.

#### Key Features:

1. **Type-safe form handling**
2. **Real-time client-side validation**
3. **Field-level error messages**
4. **Loading states**
5. **Accessibility improvements**

#### Code Structure:

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { skillSchema, type SkillFormData } from '@/lib/validations/schemas';

export default function SkillsAdmin() {
  // Initialize form with Zod validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<SkillFormData>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      label: '',
      type: 'TECHNICAL',
      icon: '',
      order: 0,
    },
  });

  // Submit handler with full type safety
  const onSubmit = async (data: SkillFormData) => {
    // data is fully validated and typed
    const response = await fetch('/api/skills', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Register inputs with validation */}
      <input
        {...register('label')}
        className={errors.label ? 'border-red-500' : ''}
      />
      {errors.label && (
        <p className="text-red-500">{errors.label.message}</p>
      )}
    </form>
  );
}
```

---

## How to Convert Existing Forms

### Step-by-Step Guide

#### 1. Import Dependencies

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { serviceSchema, type ServiceFormData } from '@/lib/validations/schemas';
```

#### 2. Replace useState with useForm

**Before:**
```typescript
const [formData, setFormData] = useState({
  name: '',
  description: '',
});
```

**After:**
```typescript
const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
  setValue,
} = useForm<ServiceFormData>({
  resolver: zodResolver(serviceSchema),
  defaultValues: {
    name: '',
    description: '',
    icon: '',
    order: 0,
  },
});
```

#### 3. Update Form Inputs

**Before:**
```typescript
<input
  value={formData.name}
  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
/>
```

**After:**
```typescript
<input
  {...register('name')}
  className={errors.name ? 'border-red-500' : ''}
/>
{errors.name && (
  <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
)}
```

#### 4. Update Submit Handler

**Before:**
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  await fetch('/api/services', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
};
```

**After:**
```typescript
const onSubmit = async (data: ServiceFormData) => {
  // No need for e.preventDefault(), React Hook Form handles it
  await fetch('/api/services', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// In JSX:
<form onSubmit={handleSubmit(onSubmit)}>
```

#### 5. Update Edit Mode

**Before:**
```typescript
const openEditModal = (service: any) => {
  setFormData({
    name: service.name,
    description: service.description,
  });
};
```

**After:**
```typescript
const openEditModal = (service: any) => {
  setValue('name', service.name);
  setValue('description', service.description);
  setValue('icon', service.icon || '');
  setValue('order', service.order);
};
```

---

## Validation Rules Reference

### Project Validation

```typescript
{
  name: string (1-100 chars, required)
  shortDescription: string (1-500 chars, required)
  image: valid URL (required)
  github: valid URL (optional, can be empty string)
  link: valid URL (required)
  status: COMPLETED | IN_PROGRESS | ARCHIVED
  order: integer >= 0
  technologyIds: array of numbers (optional)
}
```

### Skill Validation

```typescript
{
  label: string (1-100 chars, required)
  type: TECHNICAL | SOFT (enum, required)
  icon: string (max 50 chars, optional)
  order: integer >= 0
}
```

### Service Validation

```typescript
{
  name: string (1-100 chars, required)
  description: string (1-1000 chars, required)
  icon: string (max 50 chars, optional)
  order: integer >= 0
}
```

### Technology Validation

```typescript
{
  label: string (1-100 chars, required)
  value: integer 0-100 (proficiency, required)
  icon: string (max 50 chars, optional)
  href: valid URL (optional, can be empty string)
  category: DESIGN | FRONTEND | BACKEND | DATABASE | DEVOPS | GENERAL
}
```

### Post Validation

```typescript
{
  title: string (1-200 chars, required)
  subtitle: string (max 300 chars, optional)
  content: string (min 1 char, required)
  slug: string (lowercase, hyphens only, regex: ^[a-z0-9]+(?:-[a-z0-9]+)*$)
  image: valid URL (optional)
  status: DRAFT | PUBLISHED | ARCHIVED
  authorId: positive integer (required)
  categoryIds: array of numbers (optional)
  tagIds: array of numbers (optional)
}
```

---

## Benefits

### Security ✅

- **Prevents invalid data** from entering the database
- **Type checking** for enum values
- **URL validation** prevents malformed links
- **String length limits** prevent oversized data
- **Number range validation** ensures data integrity

### Developer Experience ✅

- **Type safety** - TypeScript types inferred from Zod schemas
- **Single source of truth** - Validation logic in one place
- **Better error messages** - Field-specific, user-friendly messages
- **Autocomplete** - Full IDE support for form data

### Performance ✅

- **Client-side validation** prevents unnecessary API calls
- **React Hook Form** re-renders only changed fields
- **Uncontrolled components** reduce React state updates

---

## Testing Validation

### Manual Testing Checklist

For each form, test the following scenarios:

#### ✅ Required Fields
- [ ] Submit empty form - should show "is required" errors
- [ ] Submit with only some required fields filled

#### ✅ String Length
- [ ] Enter text > max length (e.g., 101 chars for name)
- [ ] Enter text < min length

#### ✅ URL Validation
- [ ] Enter invalid URL: `not-a-url`
- [ ] Enter valid URL: `https://example.com`
- [ ] Enter URL without protocol: `example.com` (should fail)

#### ✅ Number Validation
- [ ] Enter negative number for `order` (should fail)
- [ ] Enter number > 100 for proficiency (should fail)
- [ ] Enter decimal when integer required

#### ✅ Enum Validation
- [ ] Select each enum option (TECHNICAL/SOFT, COMPLETED/IN_PROGRESS, etc.)
- [ ] Backend should reject invalid enum values

### Example Test Cases

```typescript
// ✅ Valid skill
{
  label: "React",
  type: "TECHNICAL",
  icon: "FaReact",
  order: 1
}

// ❌ Invalid skill - missing label
{
  type: "TECHNICAL",
  order: 1
}
// Error: "Label is required"

// ❌ Invalid skill - wrong type
{
  label: "React",
  type: "INVALID", // Not TECHNICAL or SOFT
  order: 1
}
// Error: "Invalid enum value"

// ❌ Invalid skill - label too long
{
  label: "A".repeat(101), // 101 characters
  type: "TECHNICAL",
  order: 1
}
// Error: "Label is too long"
```

---

## Next Steps

### Apply to All Forms

Use `app/admin/dashboard/skills-new/page.tsx` as a template to convert:

1. **Projects form** (`app/admin/dashboard/projects/page.tsx`)
2. **Services form** (`app/admin/dashboard/services/page.tsx`)
3. **Technologies form** (`app/admin/dashboard/technologies/page.tsx`)
4. **Blog form** (`app/admin/dashboard/blog/page.tsx`)

### Additional Enhancements

1. **Add DOMPurify** for XSS prevention in blog content
2. **Add authentication middleware** to protect admin routes
3. **Add CSRF tokens** for state-changing operations
4. **Implement rate limiting** to prevent abuse

---

## Troubleshooting

### Common Issues

#### "Cannot find module '@/lib/validations/schemas'"

**Solution:** Ensure TypeScript path mapping is configured in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

#### Form submits even with validation errors

**Solution:** Make sure you're using `handleSubmit` from React Hook Form:

```typescript
// ❌ Wrong
<form onSubmit={onSubmit}>

// ✅ Correct
<form onSubmit={handleSubmit(onSubmit)}>
```

#### Validation errors not showing

**Solution:** Check that you're reading from `formState.errors`:

```typescript
const { formState: { errors } } = useForm();

// Then use:
{errors.fieldName && <p>{errors.fieldName.message}</p>}
```

#### Type errors with Zod schemas

**Solution:** Make sure you're importing the type:

```typescript
import { skillSchema, type SkillFormData } from '@/lib/validations/schemas';
//                      ^^^^
```

---

## Resources

- [Zod Documentation](https://zod.dev/)
- [React Hook Form Documentation](https://react-hook-form.com/)
- [Zod + React Hook Form Guide](https://react-hook-form.com/get-started#SchemaValidation)

---

## Summary

✅ **Zod schemas created** for all models
✅ **API routes validated** with detailed error messages
✅ **Example form created** (skills-new) with React Hook Form
✅ **Type safety** across frontend and backend
✅ **Critical security issue addressed** - No Input Validation is now FIXED

**Status:** Phase 1 (Security Hardening) - Input Validation **COMPLETE** ✅
