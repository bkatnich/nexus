/**
 * index.js
 *
 * Created by Britton Katnich on February 16th, 2019.
 * Copyright © 2018 Britton Katnich. All rights reserved.
 */

const express = require('express');

// Model must be required before the controller.
require('./User.js');

// Controller
const controller = require('./users');

// Path at this point should be api/v1/users
let router = express.Router();
router.use('/users', controller);

module.exports = router;
