# Gaming Dashboard Portfolio - Setup Guide

A futuristic, gaming-inspired portfolio dashboard with full-screen sections, tab-based navigation, and responsive design.

## 🎮 Features

- **Full-screen sections** - No scrolling between pages, each section fits viewport
- **Tab-based navigation** - Desktop sidebar + Mobile bottom tabs
- **Gaming aesthetics** - Neon glows, scan lines, animated backgrounds
- **Smooth animations** - Framer Motion page transitions
- **Fully responsive** - Mobile-first design (320px+)
- **Modern stack** - Next.js 14, TypeScript, Tailwind CSS, shadcn/ui

## 📁 File Structure

```
app/
├── dashboard/
│   ├── layout.tsx              # Dashboard wrapper
│   ├── page.tsx                # Home page
│   ├── projects/
│   │   └── page.tsx            # Projects page
│   ├── skills/
│   │   └── page.tsx            # Skills page
│   ├── about/
│   │   └── page.tsx            # About page (create this)
│   └── contact/
│       └── page.tsx            # Contact page (create this)
│
components/
└── dashboard/
    ├── DashboardLayout.tsx     # Main layout wrapper
    ├── DashboardSidebar.tsx    # Desktop navigation
    ├── MobileBottomNav.tsx     # Mobile navigation
    ├── DashboardPage.tsx       # Page wrapper component
    ├── GridBackground.tsx      # Animated background
    └── ScanLine.tsx            # Scan line effect

styles/
└── dashboard.css               # Custom dashboard styles
```

## 🚀 Setup Instructions

### 1. Import the dashboard CSS

Add to your `app/globals.css`:

```css
@import '../styles/dashboard.css';
```

Or copy the contents of `dashboard.css` into `globals.css`.

### 2. Update your root layout

Make sure `app/layout.tsx` imports the global styles:

```tsx
import './globals.css';
```

### 3. Create remaining pages

Create the About and Contact pages following the same pattern as the example pages:

**app/dashboard/about/page.tsx:**
```tsx
import DashboardPage from '@/components/dashboard/DashboardPage';

export default function AboutPage() {
  return (
    <DashboardPage title="About" subtitle="Player Profile">
      {/* Your about content */}
    </DashboardPage>
  );
}
```

**app/dashboard/contact/page.tsx:**
```tsx
import DashboardPage from '@/components/dashboard/DashboardPage';

export default function ContactPage() {
  return (
    <DashboardPage title="Contact" subtitle="Mission Briefing">
      {/* Your contact form */}
    </DashboardPage>
  );
}
```

## 📱 Responsive Breakpoints

- **Mobile:** < 768px (bottom tabs, single column)
- **Tablet:** 768px - 1024px (sidebar, 2 columns)
- **Desktop:** ≥ 1024px (sidebar, 3+ columns)

## 🎨 Styling Guidelines

### Using Gaming Effects

The dashboard includes several CSS utility classes:

```tsx
// Glassmorphic card
<div className="glass-card">
  {/* Content */}
</div>

// Neon button
<button className="neon-button">
  Action
</button>

// Text glow
<h1 className="text-glow-cyan">
  Glowing Text
</h1>

// Border animation
<div className="border border-cyan-500 animate-border-pulse">
  {/* Content */}
</div>
```

### Custom Scrollbar

Applied automatically to elements with `custom-scrollbar` class:

```tsx
<div className="overflow-y-auto custom-scrollbar">
  {/* Scrollable content */}
</div>
```

## 🎯 Page Layout Pattern

Every dashboard page should follow this structure:

```tsx
import DashboardPage from '@/components/dashboard/DashboardPage';

export default function YourPage() {
  return (
    <DashboardPage 
      title="Page Title"        // Optional
      subtitle="Page Subtitle"  // Optional
    >
      <div className="h-full flex flex-col">
        {/* Your content - fits viewport */}
      </div>
    </DashboardPage>
  );
}
```

## 📐 Layout Tips

### Full-screen content (no internal scrolling)
```tsx
<div className="h-full grid grid-rows-[auto,1fr] gap-4">
  <header>Fixed header</header>
  <div className="overflow-hidden">
    {/* Content that fits */}
  </div>
</div>
```

### Scrollable content
```tsx
<div className="h-full overflow-y-auto custom-scrollbar">
  {/* Content that can scroll */}
</div>
```

### Grid layouts
```tsx
{/* Mobile: 1 col, Tablet: 2 cols, Desktop: 3 cols */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => (
    <div key={item.id} className="glass-card p-4">
      {/* Item content */}
    </div>
  ))}
</div>
```

## 🎭 Animation Patterns

### Page transitions
Already handled by `DashboardPage` component via Framer Motion.

### Staggered animations
```tsx
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    {/* Item content */}
  </motion.div>
))}
```

### Hover effects
```tsx
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="glass-card cursor-pointer"
>
  {/* Content */}
</motion.div>
```

## 🔧 Customization

### Change color scheme

Update these in your Tailwind config or use CSS variables:

- Primary: `cyan-400` (#06b6d4)
- Secondary: `purple-600` (#9333ea)
- Background: `#0a0e27`

### Modify navigation items

Edit the `navItems` array in:
- `components/dashboard/DashboardSidebar.tsx` (desktop)
- `components/dashboard/MobileBottomNav.tsx` (mobile)

```tsx
const navItems = [
  { id: 'home', label: 'Home', icon: Home, href: '/dashboard' },
  // Add your custom routes here
];
```

## 🐛 Troubleshooting

### Pages not showing
- Ensure each page is wrapped in `<DashboardPage>`
- Check that routes match navigation hrefs

### Scrolling issues
- Use `h-full` on content containers
- Apply `overflow-y-auto custom-scrollbar` where needed

### Mobile navigation hidden
- Check that viewport height is sufficient
- Ensure no z-index conflicts

### Animations not working
- Verify Framer Motion is installed: `npm install framer-motion`
- Check that components are marked as `'use client'`

## 📦 Dependencies

Required packages:
```json
{
  "framer-motion": "^10.x.x",
  "lucide-react": "^0.x.x",
  "next": "^14.x.x",
  "react": "^18.x.x",
  "tailwindcss": "^3.x.x"
}
```

Install if missing:
```bash
npm install framer-motion lucide-react
```

## 🎬 Next Steps

1. Create About page (`app/dashboard/about/page.tsx`)
2. Create Contact page (`app/dashboard/contact/page.tsx`)
3. Customize colors and branding
4. Add your real project data
5. Add keyboard shortcuts (1-5 keys for nav)
6. Implement form validation for contact
7. Add loading states
8. Add error boundaries

## 💡 Pro Tips

- Keep sections simple - they must fit in viewport
- Use `overflow-y-auto` sparingly on mobile
- Test on real devices, not just devtools
- Optimize images for faster loading
- Use `next/image` for automatic optimization
- Add `loading="lazy"` for below-fold images

---

**Built with ⚡ for speed and 🎮 for style**
