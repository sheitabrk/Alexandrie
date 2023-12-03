module.exports = {
  apps: [
    {
      name: 'alexandrie-backend',
      cwd: './backend/dist',
      script: 'node main.js',
      env: {
        NODE_ENV: 'production',
        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
        DATABASE_USER: process.env.DATABASE_USERNAME,
        JWT_SECRET: process.env.JWT_SECRET,
        PORT: 8201,
        DOMAIN_CLIENT: 'https://alexandrie-hub.fr',
        DOMAIN_DASHBOARD: 'https://dashboard.alexandrie-hub.fr',
        FRONT_DOMAIN: 'alexandrie-hub.fr',
      },
    },
    {
      name: 'alexandrie-frontend',
      cwd: './frontend',
      script: 'PORT=8200 node .output/server/index.mjs',
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'alexandrie-dashboard',
      cwd: './dashboard',
      script: 'PORT=8202 node .output/server/index.mjs',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
