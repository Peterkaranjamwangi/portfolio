# Admin Panel Documentation

A comprehensive admin panel for managing all portfolio content with full CRUD operations.

## 🎯 Features

- ✅ **Dashboard** - Overview with stats for all content types
- ✅ **Projects Management** - Full CRUD for portfolio projects
- ✅ **Skills Management** - Manage technical and soft skills
- ✅ **Services Management** - Manage offered services
- ✅ **Technologies Management** - Manage tech stack
- ✅ **Blog Management** - Manage blog posts (from previous setup)
- ✅ **Responsive Design** - Works on desktop and mobile
- ✅ **Dark Mode Support** - Built-in dark mode

## 📁 File Structure

```
app/admin/dashboard/
├── layout.tsx              # Admin layout wrapper
├── page.tsx                # Dashboard home with stats
└── projects/
    └── page.tsx            # Projects management (CRUD example)

components/admin/
└── AdminLayout.tsx         # Main admin layout with sidebar

app/api/
├── projects/
│   ├── route.ts           # GET/POST projects
│   └── [id]/route.ts      # GET/PATCH/DELETE project
├── skills/
│   ├── route.ts           # GET/POST skills
│   └── [id]/route.ts      # PATCH/DELETE skill
├── services/
│   ├── route.ts           # GET/POST services
│   └── [id]/route.ts      # PATCH/DELETE service
└── technologies/
    ├── route.ts           # GET/POST technologies
    └── [id]/route.ts      # PATCH/DELETE technology
```

## 🚀 Access the Admin Panel

```bash
# Navigate to:
http://localhost:3000/admin/dashboard
```

## 🎨 Admin Panel Features

### 1. Dashboard Home
- **Stats Cards** - Total counts for all content types
- **Quick Actions** - Shortcuts to common tasks
- **Navigation** - Sidebar with all management pages

### 2. Projects Management (Full CRUD Example)
Located at `/admin/dashboard/projects`

**Features:**
- ✅ List all projects in a table
- ✅ Create new projects with modal form
- ✅ Edit existing projects
- ✅ Delete projects with confirmation
- ✅ Assign multiple technologies to projects
- ✅ Set project status (Completed/In Progress/Archived)
- ✅ Preview images
- ✅ External links to live site and GitHub

**Operations:**
```typescript
// Create Project
POST /api/projects
Body: { name, shortDescription, image, link, github?, status, technologyIds }

// Update Project
PATCH /api/projects/[id]
Body: { name?, shortDescription?, image?, link?, github?, status?, technologyIds? }

// Delete Project
DELETE /api/projects/[id]

// Get All Projects
GET /api/projects
Query: ?status=COMPLETED

// Get Single Project
GET /api/projects/[id]
```

## 📝 Creating Additional Admin Pages

The projects page (`app/admin/dashboard/projects/page.tsx`) serves as a complete template. To create similar pages for skills, services, or technologies:

### Step 1: Create the Page File

```bash
# For Skills
mkdir app/admin/dashboard/skills
touch app/admin/dashboard/skills/page.tsx

# For Services
mkdir app/admin/dashboard/services
touch app/admin/dashboard/services/page.tsx

# For Technologies
mkdir app/admin/dashboard/technologies
touch app/admin/dashboard/technologies/page.tsx
```

### Step 2: Copy & Modify the Template

1. Copy `app/admin/dashboard/projects/page.tsx`
2. Replace the following:
   - `useProjects` → `useSkills` or `useServices` or `useTechnologies`
   - API endpoints: `/api/projects` → `/api/skills` or `/api/services` or `/api/technologies`
   - Form fields based on the model schema
   - Table columns based on data structure

### Example: Skills Page

```typescript
'use client';
import { useSkills } from '@/hooks/useSkills';

export default function SkillsAdmin() {
  const { skills, loading, refetch } = useSkills();

  // Form fields for skills
  const [formData, setFormData] = useState({
    label: '',
    type: 'TECHNICAL', // or 'SOFT'
    icon: '',
    order: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingSkill
      ? `/api/skills/${editingSkill.id}`
      : '/api/skills';
    const method = editingSkill ? 'PATCH' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    refetch();
    setIsModalOpen(false);
  };

  // Rest of the component...
}
```

## 🔐 Adding Authentication (Optional)

To secure the admin panel, you can add authentication:

### Option 1: NextAuth.js

```bash
npm install next-auth
```

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Verify credentials against database
        // Return user object or null
      }
    })
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

### Option 2: Middleware Protection

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if user is authenticated
  const isAuthenticated = request.cookies.get('admin-token');

  if (!isAuthenticated && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
```

## 🎨 Customization

### Change Theme Colors

Edit `components/admin/AdminLayout.tsx`:

```typescript
// Active link color
className={`${isActive ? 'bg-cyan-500' : 'hover:bg-gray-100'}`}

// Change to:
className={`${isActive ? 'bg-purple-500' : 'hover:bg-gray-100'}`}
```

### Add More Nav Items

Edit `components/admin/AdminLayout.tsx`:

```typescript
const navItems = [
  // ... existing items
  {
    id: 'users',
    label: 'Users',
    icon: Users,
    href: '/admin/dashboard/users'
  },
];
```

## 📊 Database Models

All CRUD operations work with these Prisma models:

```prisma
model Project {
  id               Int
  name             String
  shortDescription String
  image            String
  github           String?
  link             String
  status           ProjectStatus
  order            Int
  technologies     Technology[]
}

model Skill {
  id        Int
  label     String
  type      SkillType
  icon      String?
  order     Int
}

model Service {
  id          Int
  name        String
  description String
  icon        String?
  order       Int
}

model Technology {
  id        Int
  label     String
  value     Int
  icon      String?
  href      String?
  category  TechCategory
  projects  Project[]
}
```

## 🛠️ API Endpoints Reference

### Projects
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create project
- `GET /api/projects/[id]` - Get single project
- `PATCH /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

### Skills
- `GET /api/skills?type=TECHNICAL` - List skills (filterable)
- `POST /api/skills` - Create skill
- `PATCH /api/skills/[id]` - Update skill
- `DELETE /api/skills/[id]` - Delete skill

### Services
- `GET /api/services` - List all services
- `POST /api/services` - Create service
- `PATCH /api/services/[id]` - Update service
- `DELETE /api/services/[id]` - Delete service

### Technologies
- `GET /api/technologies?category=FRONTEND` - List technologies (filterable)
- `POST /api/technologies` - Create technology
- `PATCH /api/technologies/[id]` - Update technology
- `DELETE /api/technologies/[id]` - Delete technology

### Blog Posts
- `GET /api/posts?status=PUBLISHED` - List posts (filterable)
- `POST /api/posts` - Create post
- `GET /api/posts/[id]` - Get single post
- `PATCH /api/posts/[id]` - Update post
- `DELETE /api/posts/[id]` - Delete post

## 🎯 Common Tasks

### Add a New Project
1. Go to `/admin/dashboard/projects`
2. Click "Add Project" button
3. Fill in the form (name, description, image URL, live link)
4. Select technologies from the checklist
5. Click "Create"

### Edit Project
1. Find the project in the table
2. Click the Edit icon (pencil)
3. Modify the form fields
4. Click "Update"

### Delete Project
1. Find the project in the table
2. Click the Delete icon (trash)
3. Confirm deletion in the popup

### Bulk Operations
To implement bulk delete:

```typescript
const [selectedIds, setSelectedIds] = useState<number[]>([]);

const handleBulkDelete = async () => {
  await Promise.all(
    selectedIds.map(id => fetch(`/api/projects/${id}`, { method: 'DELETE' }))
  );
  refetch();
  setSelectedIds([]);
};
```

## 🐛 Troubleshooting

### Admin panel not loading
- Check that all files are in correct locations
- Ensure `AdminLayout` is properly imported in layout.tsx
- Verify API routes are accessible

### Modal not closing
- Make sure `setIsModalOpen(false)` is called after successful operations
- Check for JavaScript errors in console

### Data not refreshing
- Ensure `refetch()` is called after CREATE/UPDATE/DELETE
- Check API responses in Network tab

### Styling issues
- Verify Tailwind classes are compiled
- Check dark mode settings if colors look wrong

## 📚 Next Steps

1. **Add Authentication** - Protect admin routes
2. **Image Upload** - Integrate Cloudinary/S3 for image uploads
3. **Bulk Operations** - Add multi-select and bulk delete
4. **Search & Filter** - Add search bars and filters to tables
5. **Pagination** - Implement pagination for large datasets
6. **Audit Log** - Track who made what changes
7. **Permissions** - Role-based access control (ADMIN, EDITOR, etc.)
8. **Export Data** - Add CSV/JSON export functionality

## 🎉 You're All Set!

Your admin panel is now ready to manage all portfolio content. The projects page demonstrates the complete pattern for CRUD operations that you can replicate for any other resource.

Visit: http://localhost:3000/admin/dashboard
