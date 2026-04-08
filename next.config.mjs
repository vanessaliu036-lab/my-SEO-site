/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.origincafekh.com" }],
        destination: "https://origincafekh.com/:path*",
        permanent: true,
      },
      { source: "/blog/", destination: "/blog", permanent: true },
      // 誤植成 /blog/blog/文章… 時導回正確 /blog/文章…
      {
        source: "/blog/blog/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
