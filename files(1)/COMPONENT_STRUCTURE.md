# Dashboard Component Structure

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────┐
│          DashboardLayout.tsx                │
│  ┌───────────────────────────────────────┐  │
│  │  GridBackground + ScanLine (effects)  │  │
│  └───────────────────────────────────────┘  │
│                                             │
│  ┌──────────────┐  ┌──────────────────┐    │
│  │  Sidebar     │  │   Main Content   │    │
│  │  (Desktop)   │  │                  │    │
│  │              │  │  DashboardPage   │    │
│  │  - Home      │  │  ┌────────────┐  │    │
│  │  - Projects  │  │  │  Header    │  │    │
│  │  - Skills    │  │  ├────────────┤  │    │
│  │  - About     │  │  │  Content   │  │    │
│  │  - Contact   │  │  │  (scrolls) │  │    │
│  │              │  │  └────────────┘  │    │
│  └──────────────┘  └──────────────────┘    │
│                                             │
│  ┌───────────────────────────────────────┐  │
│  │  MobileBottomNav (Mobile only)        │  │
│  │  [Home] [Projects] [Skills] [About]   │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

## 📱 Responsive Behavior

### Mobile (< 768px)
```
┌─────────────────┐
│   Full Screen   │
│                 │
│    Content      │
│    Section      │
│                 │
│   (100vh -      │
│    64px tabs)   │
├─────────────────┤
│  Bottom Tabs    │
│ [🏠][💼][⚡][👤] │
└─────────────────┘
```

### Desktop (≥ 768px)
```
┌────────┬─────────────────┐
│ Side   │                 │
│ Nav    │   Content       │
│ (64px) │   Section       │
│        │   (100vh)       │
│ [Home] │                 │
│ [Proj] │   Full Height   │
│ [Skil] │   No Scroll     │
│ [About]│   Between       │
│ [Cont] │   Sections      │
│        │                 │
│[Status]│                 │
└────────┴─────────────────┘
```

## 🎨 Component Relationships

### DashboardLayout (Main Wrapper)
```tsx
DashboardLayout
├── GridBackground (visual effect)
├── ScanLine (visual effect)
├── DashboardSidebar (desktop only)
├── {children} (page content)
└── MobileBottomNav (mobile only)
```

### DashboardPage (Page Wrapper)
```tsx
DashboardPage
├── Header (title + subtitle)
│   ├── Title (animated gradient)
│   ├── Subtitle
│   └── Decorative line
└── Content Container
    └── {children} (actual page content)
```

## 🎯 Data Flow

1. **User clicks navigation** → Router updates pathname
2. **Layout detects route change** → AnimatePresence triggers
3. **New page animates in** → Framer Motion handles transition
4. **Content renders** → Wrapped in DashboardPage
5. **Effects persist** → GridBackground & ScanLine continue

## 🔄 Page Transition Flow

```
Current Page (Projects)
    ↓
  [fade out + slide left]
    ↓
  Route Change
    ↓
  [fade in + slide from right]
    ↓
New Page (Skills)
```

## 🎮 Gaming Aesthetic Elements

### Visual Layers (z-index)
```
50: MobileBottomNav, ScanLine, Sidebar
30: Modal overlays (future)
20: Floating elements
10: Main content (DashboardPage)
 1: GridBackground
 0: Base background color
```

### Color Palette
```
Primary:    Cyan (#06b6d4)
Secondary:  Purple (#9333ea) 
Accent:     Pink (#ec4899)
Background: Dark Blue (#0a0e27)
Surface:    Black with transparency
Text:       White / Gray
```

## 📦 File Dependencies

```
app/dashboard/page.tsx
  ↓ imports
components/dashboard/DashboardPage.tsx
  ↓ imports
framer-motion, motion components

app/dashboard/layout.tsx
  ↓ imports
components/dashboard/DashboardLayout.tsx
  ↓ imports
├── DashboardSidebar
├── MobileBottomNav
├── GridBackground
└── ScanLine
```

## 🎬 Animation Timing

```
Page Transition:     300ms (spring)
Nav Hover:          200ms (ease)
Card Hover:         300ms (ease)
Scroll Reveal:      500ms (ease-out)
Background Drift:   20-25s (ease-in-out, infinite)
Scan Line:          8s (linear, infinite)
Border Pulse:       2s (ease-in-out, infinite)
```

## 🔧 Key Configuration Points

### 1. Navigation Items
**File:** `DashboardSidebar.tsx` + `MobileBottomNav.tsx`
```tsx
const navItems = [
  { id: 'home', label: 'Home', icon: Home, href: '/dashboard' },
  // Add more here
];
```

### 2. Page Variants
**File:** `DashboardPage.tsx`
```tsx
const pageVariants = {
  initial: { opacity: 0, x: 100, scale: 0.95 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -100, scale: 0.95 },
};
```

### 3. Color Scheme
**File:** `tailwind.config.ts` or CSS variables
```js
colors: {
  primary: '#06b6d4',    // cyan
  secondary: '#9333ea',  // purple
  accent: '#ec4899',     // pink
}
```

## 💡 Usage Examples

### Creating a New Page
```tsx
// app/dashboard/newpage/page.tsx
import DashboardPage from '@/components/dashboard/DashboardPage';

export default function NewPage() {
  return (
    <DashboardPage title="New Page" subtitle="Description">
      <div className="h-full">
        {/* Your content */}
      </div>
    </DashboardPage>
  );
}
```

### Adding to Navigation
```tsx
// In DashboardSidebar.tsx and MobileBottomNav.tsx
{ id: 'newpage', label: 'New', icon: Star, href: '/dashboard/newpage' }
```

### Using Gaming Styles
```tsx
<div className="glass-card p-4">
  <h2 className="text-glow-cyan">Title</h2>
  <button className="neon-button">Action</button>
</div>
```

---

This structure ensures:
✅ Clean separation of concerns
✅ Reusable components
✅ Consistent styling
✅ Smooth animations
✅ Mobile-first responsive design
