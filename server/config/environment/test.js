'use strict';
/*eslint no-process-env:0*/

// Test specific configuration
// ===========================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/tsms-test'
  },
  sequelize: {
    uri: 'sqlite://',
    options: {
      logging: false,
      storage: 'test.sqlite',
      define: {
        timestamps: false
      }
    }
  },
  logging: {
    console: {
      level: 'warn'
    },
    file: {
      level: 'warn',
      filename: 'tsms.test.log'
    }
  }
};
