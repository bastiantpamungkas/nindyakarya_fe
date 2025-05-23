module.exports = {
  apps: [
    {
      name: "nindyakarya", // Nama aplikasi untuk PM2
      script: "node_modules/next/dist/bin/next", // Script Next.js
      args: "start", // Mode start untuk production
      cwd: "/var/www/nindyakarya",
      env: {
        NODE_ENV: "production", // Environment production
        PORT: 3001, // Port aplikasi
      },
    },
  ],
};
