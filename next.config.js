/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/api/randword",
        destination: "http://localhost:3001/api/randword",
      },
      {
        source: "/api/word/:word",
        destination: "http://localhost:3001/api/word/:word",
      },
      {
        source: "/api/user/register",
        destination: "http://localhost:3001/api/user/register",
      },
      {
        source: "/socket.io",
        destination: "http://localhost:3001/socket.io/",
      },
    ];
  },
};

module.exports = nextConfig;
