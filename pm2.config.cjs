if (!process.env.GITHUB_REPOSITORY) {
  throw "GITHUB_REPOSITORY not defined!";
}

module.exports = {
  apps: [
    {
      name: process.env.GITHUB_REPOSITORY,
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
