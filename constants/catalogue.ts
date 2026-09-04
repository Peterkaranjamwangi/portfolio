/**
 * The estimator catalogue: what can be built, and what each piece costs.
 *
 * This is shared between the browser (to render the cards) and the server (to
 * price a selection). The server never trusts a cost that arrives in a request
 * body — it looks every slug up here again.
 */

export interface Industry {
  slug: string;
  label: string;
  /** Applied to the whole subtotal; 1 means baseline. */
  multiplier: number;
}

export interface ProjectType {
  slug: string;
  label: string;
  /** lucide-react icon name. */
  icon: string;
  description: string;
  baseCostKes: number;
  baseWeeks: number;
}

export interface Feature {
  slug: string;
  label: string;
  category: string;
  description: string;
  costKes: number;
}

export interface FeatureGroup {
  category: string;
  features: Feature[];
}

export const INDUSTRIES: readonly Industry[] = [
  { slug: "education", label: "Education", multiplier: 1 },
  { slug: "health", label: "Healthcare", multiplier: 1.2 },
  { slug: "retail", label: "Retail & e-commerce", multiplier: 1 },
  { slug: "finance", label: "Saccos & finance", multiplier: 1.25 },
  { slug: "realestate", label: "Real estate", multiplier: 1 },
  { slug: "logistics", label: "Logistics", multiplier: 1.1 },
  { slug: "agri", label: "Agriculture", multiplier: 1 },
  { slug: "ngo", label: "NGOs & government", multiplier: 1.15 },
] as const;

export const PROJECT_TYPES: readonly ProjectType[] = [
  {
    slug: "platform",
    label: "Web platform with admin",
    icon: "layout-dashboard",
    description: "Customer accounts, roles, billing, admin panel.",
    baseCostKes: 450_000,
    baseWeeks: 8,
  },
  {
    slug: "android",
    label: "Android app",
    icon: "smartphone",
    description: "Published to the Play Store, offline-first.",
    baseCostKes: 350_000,
    baseWeeks: 6,
  },
  {
    slug: "multi",
    label: "One Flutter app: web + desktop + Android",
    icon: "layers",
    description: "Linux, Windows, macOS and web from one codebase.",
    baseCostKes: 600_000,
    baseWeeks: 10,
  },
  {
    slug: "site",
    label: "Marketing site + CMS",
    icon: "rocket",
    description: "Fast, SEO-ready pages you can edit yourself.",
    baseCostKes: 120_000,
    baseWeeks: 3,
  },
  {
    slug: "shop",
    label: "Online store",
    icon: "shopping-bag",
    description: "Catalogue, cart, M-Pesa and card checkout.",
    baseCostKes: 300_000,
    baseWeeks: 5,
  },
  {
    slug: "api",
    label: "API & integrations",
    icon: "plug",
    description: "Express backend, OpenAPI docs, third-party integrations.",
    baseCostKes: 250_000,
    baseWeeks: 5,
  },
  {
    slug: "pro",
    label: "Professional website",
    icon: "stethoscope",
    description:
      "For doctors, lawyers and consultants: profile, services, bookings.",
    baseCostKes: 90_000,
    baseWeeks: 2,
  },
] as const;

/**
 * Optional modules, keyed by project type. A slug may repeat across types (the
 * M-Pesa module exists nearly everywhere) with a type-specific price, so
 * feature lookups always need the project type as context.
 */
export const FEATURES_BY_PROJECT_TYPE: Readonly<
  Record<string, readonly Feature[]>
> = {
  platform: [
    {
      slug: "sso",
      category: "Accounts & access",
      label: "Google / Microsoft sign-in",
      description: "Staff log in with their work accounts.",
      costKes: 45_000,
    },
    {
      slug: "roles",
      category: "Accounts & access",
      label: "Roles & permissions",
      description: "Owner, manager and staff views.",
      costKes: 35_000,
    },
    {
      slug: "mpesa",
      category: "Payments",
      label: "M-Pesa integration",
      description: "STK push, callbacks, reconciliation.",
      costKes: 60_000,
    },
    {
      slug: "invoicing",
      category: "Payments",
      label: "Invoicing & receipts",
      description: "PDF invoices, reminders, VAT.",
      costKes: 40_000,
    },
    {
      slug: "reports",
      category: "Reporting",
      label: "Reports & exports",
      description: "Dashboards, CSV and Excel export.",
      costKes: 50_000,
    },
    {
      slug: "audit",
      category: "Reporting",
      label: "Audit log",
      description: "Who changed what, and when.",
      costKes: 25_000,
    },
  ],
  android: [
    {
      slug: "push",
      category: "Engagement",
      label: "Push notifications",
      description: "Firebase Cloud Messaging.",
      costKes: 30_000,
    },
    {
      slug: "sms",
      category: "Engagement",
      label: "SMS reminders",
      description: "Africa's Talking or Twilio.",
      costKes: 25_000,
    },
    {
      slug: "mpesa",
      category: "Payments",
      label: "M-Pesa integration",
      description: "In-app STK push.",
      costKes: 60_000,
    },
    {
      slug: "offline",
      category: "Data",
      label: "Offline sync",
      description: "Works without signal, syncs later.",
      costKes: 70_000,
    },
    {
      slug: "maps",
      category: "Data",
      label: "Maps & GPS",
      description: "Live location, routes, geofences.",
      costKes: 55_000,
    },
  ],
  multi: [
    {
      slug: "installers",
      category: "Distribution",
      label: "Desktop installers & auto-update",
      description: ".deb, .msi and .dmg with an update channel.",
      costKes: 80_000,
    },
    {
      slug: "play",
      category: "Distribution",
      label: "Play Store listing",
      description: "Assets, review and release.",
      costKes: 30_000,
    },
    {
      slug: "offline",
      category: "Data",
      label: "Offline sync",
      description: "Local SQLite, background sync.",
      costKes: 70_000,
    },
    {
      slug: "mpesa",
      category: "Payments",
      label: "M-Pesa integration",
      description: "Shared across platforms.",
      costKes: 60_000,
    },
    {
      slug: "reports",
      category: "Reporting",
      label: "Reports & exports",
      description: "PDF and Excel.",
      costKes: 50_000,
    },
  ],
  site: [
    {
      slug: "cms",
      category: "Content",
      label: "Headless CMS",
      description: "Sanity or MDX, editable by you.",
      costKes: 40_000,
    },
    {
      slug: "blog",
      category: "Content",
      label: "Blog & newsletter",
      description: "Posts, RSS and email capture.",
      costKes: 30_000,
    },
    {
      slug: "seo",
      category: "Growth",
      label: "SEO & analytics setup",
      description: "Metadata, sitemap, GA4, Search Console.",
      costKes: 25_000,
    },
    {
      slug: "i18n",
      category: "Growth",
      label: "Second language",
      description: "Swahili or French.",
      costKes: 35_000,
    },
  ],
  shop: [
    {
      slug: "mpesa",
      category: "Payments",
      label: "M-Pesa checkout",
      description: "STK push and reconciliation.",
      costKes: 60_000,
    },
    {
      slug: "cards",
      category: "Payments",
      label: "Card payments",
      description: "Stripe or Flutterwave.",
      costKes: 40_000,
    },
    {
      slug: "inventory",
      category: "Operations",
      label: "Inventory & stock alerts",
      description: "Variants and low-stock alerts.",
      costKes: 45_000,
    },
    {
      slug: "delivery",
      category: "Operations",
      label: "Delivery zones & fees",
      description: "Nairobi zones and pickup points.",
      costKes: 30_000,
    },
    {
      slug: "seo",
      category: "Growth",
      label: "SEO & analytics setup",
      description: "Product schema and GA4.",
      costKes: 25_000,
    },
  ],
  api: [
    {
      slug: "openapi",
      category: "Docs & access",
      label: "OpenAPI docs & sandbox",
      description: "Swagger UI, keys, rate limits.",
      costKes: 35_000,
    },
    {
      slug: "auth",
      category: "Docs & access",
      label: "OAuth / API keys",
      description: "Per-partner access and scopes.",
      costKes: 40_000,
    },
    {
      slug: "mpesa",
      category: "Integrations",
      label: "M-Pesa Daraja",
      description: "STK, C2B, B2C and reconciliation.",
      costKes: 60_000,
    },
    {
      slug: "legacy",
      category: "Integrations",
      label: "Connect an existing system",
      description: "Sync with your current database or ERP.",
      costKes: 70_000,
    },
    {
      slug: "monitoring",
      category: "Operations",
      label: "Monitoring & alerts",
      description: "Uptime, error tracking, logs.",
      costKes: 30_000,
    },
  ],
  pro: [
    {
      slug: "booking",
      category: "Bookings",
      label: "Online appointments",
      description: "Calendar, reminders, cancellations.",
      costKes: 35_000,
    },
    {
      slug: "whatsapp",
      category: "Bookings",
      label: "WhatsApp enquiry button",
      description: "Click-to-chat with a pre-filled message.",
      costKes: 8_000,
    },
    {
      slug: "reviews",
      category: "Trust",
      label: "Reviews & testimonials",
      description: "Google reviews embed with moderation.",
      costKes: 15_000,
    },
    {
      slug: "seo",
      category: "Growth",
      label: "Local SEO setup",
      description: "Google Business, schema, metadata.",
      costKes: 20_000,
    },
    {
      slug: "blog",
      category: "Content",
      label: "Articles & health tips",
      description: "Editable posts to rank for your specialty.",
      costKes: 25_000,
    },
  ],
};

/* ------------------------------------------------------------------ lookups */

export function getIndustry(slug: string | null | undefined) {
  if (!slug) return undefined;
  return INDUSTRIES.find((i) => i.slug === slug);
}

export function getProjectType(slug: string | null | undefined) {
  if (!slug) return undefined;
  return PROJECT_TYPES.find((t) => t.slug === slug);
}

/**
 * Every project type is offered to every industry today. The signature takes
 * the industry anyway so narrowing the catalogue later — "saccos do not buy
 * marketing sites" — is a change here and nowhere else.
 */
export function projectTypesForIndustry(
  industrySlug: string | null | undefined,
): ProjectType[] {
  if (!getIndustry(industrySlug)) return [];
  return [...PROJECT_TYPES];
}

export function featuresForProjectType(
  projectTypeSlug: string | null | undefined,
): Feature[] {
  if (!projectTypeSlug) return [];
  return [...(FEATURES_BY_PROJECT_TYPE[projectTypeSlug] ?? [])];
}

export function getFeature(
  projectTypeSlug: string | null | undefined,
  featureSlug: string,
): Feature | undefined {
  return featuresForProjectType(projectTypeSlug).find(
    (f) => f.slug === featureSlug,
  );
}

/**
 * Groups in first-appearance order, so the catalogue's own ordering decides how
 * step 3 reads rather than the alphabet.
 */
export function groupFeaturesByCategory(features: Feature[]): FeatureGroup[] {
  const groups: FeatureGroup[] = [];

  for (const feature of features) {
    const existing = groups.find((g) => g.category === feature.category);
    if (existing) existing.features.push(feature);
    else groups.push({ category: feature.category, features: [feature] });
  }

  return groups;
}
