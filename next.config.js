/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://192.168.1.8:9099/:path*',
      },
    ];
  },
};

module.exports = nextConfig; 