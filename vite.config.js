import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Social link previews (WhatsApp, Facebook, LinkedIn) need absolute image URLs.
// On Vercel the production domain is provided automatically at build time;
// set SITE_URL yourself to override it (e.g. for a custom domain).
const siteUrl =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '')

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'site-url',
      transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', siteUrl.replace(/\/$/, '')),
    },
  ],
})
