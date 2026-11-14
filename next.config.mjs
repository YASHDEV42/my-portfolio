import createNextIntlPlugin from "next-intl/plugin"

/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
]

const nextConfig = {
  experimental: {
    // By default all CSS is merged into one chunk, including the Arabic
    // @font-face rules, and next/font preloads whatever fonts a route's CSS
    // chunk contains. That made en and tr preload the Arabic faces even though
    // only app/ar imports them. Graph chunking with a low request cost gives
    // CSS that a route never imports its own chunk, so the Arabic fonts are
    // linked and preloaded on /ar only.
    cssChunking: { type: "graph", requestCost: 4000 },
  },
  images: {
    // AVIF where the browser supports it, WebP otherwise.
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }]
  },
}

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)
