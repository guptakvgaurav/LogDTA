/**
 * Main application file
 */

'use strict';

import express from 'express';
import mongoose from 'mongoose';
const cookieParser=require("cookie-parser");
mongoose.Promise = require('bluebird');
import config from './config/environment';
import http from 'http';
import seedDatabaseIfNeeded from './config/seed';

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1); // eslint-disable-line no-process-exit
});

// Setup server
const app = express();
const server = http.createServer(app);
require('./config/express').default(app);
require('./routes').default(app);

//using cookie-parser
app.use(cookieParser());

// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

seedDatabaseIfNeeded();
setImmediate(startServer);

// Expose app
exports = module.exports = app;
