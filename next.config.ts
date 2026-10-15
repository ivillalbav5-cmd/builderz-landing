import type { NextConfig } from "next";

// Analítica opcional: si hay IDs de GA4 / Meta Pixel, se habilitan sus dominios en la CSP.
const hasGA = Boolean(process.env.NEXT_PUBLIC_GA_ID);
const hasPixel = Boolean(process.env.NEXT_PUBLIC_META_PIXEL_ID);
const gaScript = hasGA ? ["https://www.googletagmanager.com"] : [];
const gaConnect = hasGA
  ? ["https://www.googletagmanager.com", "https://*.google-analytics.com", "https://*.analytics.google.com"]
  : [];
const gaImg = hasGA ? ["https://www.googletagmanager.com", "https://*.google-analytics.com"] : [];
const pixelScript = hasPixel ? ["https://connect.facebook.net"] : [];
const pixelConnect = hasPixel ? ["https://www.facebook.com", "https://connect.facebook.net"] : [];
const pixelImg = hasPixel ? ["https://www.facebook.com"] : [];

// CSP estricta por origen. 'unsafe-inline' en scripts es necesario para el sitio estático de Next
// (sin nonce, que forzaría render dinámico). Solo se aplica en producción: en dev Next usa eval.
const csp = [
  "default-src 'self'",
  ["script-src 'self' 'unsafe-inline'", ...gaScript, ...pixelScript].join(" "),
  "style-src 'self' 'unsafe-inline'",
  ["img-src 'self' data: blob:", ...gaImg, ...pixelImg].join(" "),
  "font-src 'self'",
  ["connect-src 'self'", ...gaConnect, ...pixelConnect].join(" "),
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const isProd = process.env.NODE_ENV === "production";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  ...(isProd
    ? [
        { key: "Content-Security-Policy", value: csp },
        { key: "Strict-Transport-Security", value: "max-age=31536000" },
      ]
    : []),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"], qualities: [50, 75, 90] },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
