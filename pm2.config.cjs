module.exports = {
  apps: [
    {
      name: "remix-portfolio",
      script: "npm",
      args: "start",
      autorestart: true,
      watch: false,
      env: {
        PORT: process.env.PORT,
        CONTENT_GITHUB_TOKEN: process.env.CONTENT_GITHUB_TOKEN,
      },
    },
  ],
};
