'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/tsms-dev'
  },

  // Seed database on startup
  seedDB: false,
  logging: {
    console: {
      level: 'silly'
    },
    file: {
      level: 'silly',
      filename: 'tsms.dev.log'
    }
  }
};
