/** @type {import('next').NextConfig} */

// sample image
// https://adms.antowiranto.my.id/upload/pers/user/avatar/2024-12-20/40150.jpg

const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'adms.antowiranto.my.id'
          },
        ],
      },
    
};

export default nextConfig;
