const { defineConfig } = require("cypress");
const { configurePlugin } = require("cypress-mongodb");

module.exports = defineConfig({
  env: {
    mongodb: {
      uri: process.env.MONGO_URI,
      database: process.env.DB_NAME,
      collection: process.env.COLLECTION,
    },
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // Pass the on and config to the mongodb plugin to enable MongoDB tasks
      configurePlugin(on, config);

      // Make sure to return the updated config object
      return config;
    },
  },
});
