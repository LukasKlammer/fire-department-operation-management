// import { defineConfig } from 'cypress';

// Populate process.env with values from .env file
// require('dotenv').config();

// export default defineConfig {
export default {
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      config.env.REACT_APP_GOOGLE_CLIENTID = '***REMOVED***'
      config.env.REACT_APP_GOOGLE_CLIENT_SECRET = '***REMOVED***'
      config.env.GOOGLE_REFRESH_TOKEN = '***REMOVED***'
      // on('task', myTask),
    },
    env: {
      googleRefreshToken: "***REMOVED***",
      googleClientId: "***REMOVED***",
      googleClientSecret: "***REMOVED***"
    }

  }

  // ,

  // env: {
  //   googleClientId: '***REMOVED***',
  //   googleClientSecret: '***REMOVED***',
  //   googleRefreshToken: '***REMOVED***',
  // }
};


