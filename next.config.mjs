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
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }]
  },
}

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)
