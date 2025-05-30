// /** @type {import('next').NextConfig} */
// const nextConfig = {
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  // images: {
  //   unoptimized: true,
  // },
// }

// export default nextConfig
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // quyidagilar faqat server komponentlarida qolsin:
    serverComponentsExternalPackages: [
      "mongodb",
      "@napi-rs/snappy",
      // agar kerak bo‘lsa, to‘liq paket nomlarini ham qo‘shing:
      "@napi-rs/snappy-win32-x64-msvc"
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  env: {
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    SMTP_FROM: process.env.SMTP_FROM,
    CONTACT_EMAIL: process.env.CONTACT_EMAIL,
  },
}

module.exports = nextConfig
