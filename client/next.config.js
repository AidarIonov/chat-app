/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        APP_URL: process.env.REACT_APP_URL,
        APP_SERVER_URL: process.env.REACT_APP_SERVER_URL,
    },
    images: {
        domains: [
            'localhost',
            'lh3.googleusercontent.com',
            'w7.pngwing.com',
            'img.etimg.com',
            'wac-cdn.atlassian.com',
            'dwpdigital.blog.gov.uk',
            's3-us-west-2.amazonaws.com'
        ]
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:4200/api/:path*'
            },
            {
                source: '/uploads/:path*',
                destination: 'http://localhost:4200/uploads/:path*'
            }
        ]
    }
}

module.exports = nextConfig
