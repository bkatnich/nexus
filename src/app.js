/**
 * app.js
 *
 * Created by Britton Katnich on February 27th, 2019.
 * Copyright © 2018 Britton Katnich. All rights reserved.
 */

const cors = require('cors');
const express = require('express');
const winston = require('winston');

/// Configuration
const { port } = require('./common/config.js');

/// Logger
const { configureLogger } = require('./common/logger.js');
configureLogger();

/// App Configuration
const app = express();

// App: Middleware
app.use(cors());

// App: Routes & Models
app.use(require('./api'));

app.get('/', (req, res) => {
  res.send('Welcome to nexus!');
});

// App: Start Listening
app.listen(port, () =>
  winston.info('MyApp listening on port:' + port)
);

module.exports = app;
