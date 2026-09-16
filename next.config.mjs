/**
 * The Supabase project host, so `next/image` will serve bucket images.
 * Parsed defensively: a malformed URL should not take the build down.
 */
const supabaseHostname = (() => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) return null;
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
})();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker
  output: 'standalone',

  // Optimize production builds
  poweredByHeader: false,
  compress: true,

  // React 19 compatibility
  reactStrictMode: true,

  // Turbopack configuration (empty = use defaults, silences webpack warning)
  turbopack: {},

  // Experimental features for Next.js 16
  experimental: {
    // Enable server actions (stable in Next.js 15)
    serverActions: {
      bodySizeLimit: '2mb',
    },
    // Optimize package imports
    optimizePackageImports: [
      'lucide-react',
      'react-icons',
      '@radix-ui/react-accordion',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-tabs',
    ],
  },

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // The Supabase storage bucket, when configured.
      ...(supabaseHostname
        ? [{ protocol: 'https', hostname: supabaseHostname, pathname: '/storage/v1/object/public/**' }]
        : []),
      // TODO: drop this wildcard. It lets the image optimizer fetch from any
      // HTTPS host, which is worth keeping only until every stored project
      // image has been moved into the bucket above.
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  /**
   * Cache-Control, by asset class.
   *
   * The governing rule: `immutable` is only honest on a URL that changes when
   * its bytes change. Next already serves /_next/static (JS, CSS, and the
   * fonts, which is why they live beside globals.css rather than in /public)
   * as `immutable` for a year, because it content-hashes those filenames. None
   * of the rules below try to re-state that.
   */
  async headers() {
    return [
      {
        // Never let anything store an API response. These are admin-editable
        // or authenticated, and several are per-user; a shared cache holding
        // one would serve one visitor's data to the next. Without an explicit
        // header a cache may still apply its own heuristic freshness.
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, must-revalidate' },
          // Belt and braces for caches that only look at the old header.
          { key: 'Pragma', value: 'no-cache' },
        ],
      },
      {
        // Authenticated surfaces. Next marks these statically renderable and
        // was advertising `s-maxage=31536000`, which invites a shared cache to
        // keep an admin page for a year. `private` keeps them out of shared
        // caches entirely.
        source: '/admin/:path*',
        headers: [
          { key: 'Cache-Control', value: 'private, no-store, must-revalidate' },
        ],
      },
      {
        source: '/sign-in',
        headers: [
          { key: 'Cache-Control', value: 'private, no-store, must-revalidate' },
        ],
      },
      {
        // Images and the CV shipped in /public. These are not content-hashed,
        // so they cannot be `immutable` — but `max-age=0` meant a revalidation
        // round trip for every one of them on every page load. A day of
        // freshness with a week of stale-while-revalidate serves repeat
        // visitors from cache and refreshes in the background after a deploy.
        source: '/:file*.(jpg|jpeg|png|gif|webp|avif|svg|ico|pdf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
      {
        // Security headers, applied to everything.
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
