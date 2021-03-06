/**
 * index.js
 *
 * Created by Britton Katnich on February 16th, 2019.
 * Copyright © 2018 Britton Katnich. All rights reserved.
 */

const express = require('express');

// Path at this point should be api/v1
let router = express.Router();
router.use('/v1', require('./users'));

router.get('/v1', (req, res) => {
  res.send('Hey there ... you are in my api/v1 directory');
});

module.exports = router;
