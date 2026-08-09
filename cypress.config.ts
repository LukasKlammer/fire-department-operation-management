export default {
  e2e: {
    setupNodeEvents(on: unknown, config: { env: Record<string, string | undefined> }) {
      config.env.googleClientId = process.env.CYPRESS_GOOGLE_CLIENT_ID;
      config.env.googleClientSecret = process.env.CYPRESS_GOOGLE_CLIENT_SECRET;
      config.env.googleRefreshToken = process.env.CYPRESS_GOOGLE_REFRESH_TOKEN;
      return config;
    },
  },
};
