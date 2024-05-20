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
        GITHUB_TOKEN: process.env.GITHUB_TOKEN,
      },
    },
  ],
};
