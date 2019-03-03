/**
 * app.js
 *
 * Created by Britton Katnich on February 27th, 2019.
 * Copyright © 2018 Britton Katnich. All rights reserved.
 */


require('passport');
require('http');
require('path');
require('methods');

const apv = require('appversion');
const cors = require('cors');
const bodyParser = require('body-parser')
const errorhandler = require('errorhandler');
const express = require('express');
const mongoose = require('mongoose');
const winston = require('winston');

/// Node environment
const isProduction = process.env.NODE_ENV === 'production';

/// Configuration
const { port } = require('./common/config.js');

/// Logger
const { configureLogger } = require('./common/logger.js');
configureLogger();

/// App Configuration
const app = express();

// App: Middleware
app.use(require('morgan')('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/// Production only
if(isProduction){
  mongoose.connect(process.env.MONGODB_URI);
/// Development only
} else {
  app.use(errorhandler());
  mongoose.connect('mongodb://localhost/nexus', { 
    useCreateIndex: true,
    useNewUrlParser: true });
  mongoose.set('debug', true);
}

// App: Routes & Models
app.use(require('./api'));

app.get('/', (req, res) => {
  res.send('Welcome to the latest version of nexus: ' + apv.composePatternSync('M.m.p-n d'));
});

/// Passport: this must be done after the routes & models
require('./common/passport.js');

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function(err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({'errors': {
      message: err.message,
      error: err
    }});
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});

// App: Start Listening
app.listen(port, () =>
  winston.info('MyApp listening on port:' + port)
);

module.exports = app;
