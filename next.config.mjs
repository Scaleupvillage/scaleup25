/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "scontent.cdninstagram.com",
            },
            {
                protocol: "https",
                hostname: "drive.google.com",
            },
            {
                protocol: "https",
                hostname: "drive.usercontent.google.com",
            },
        ],
    },
    reactStrictMode: false,
};

export default nextConfig;
