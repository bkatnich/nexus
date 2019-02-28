/**
 * index.js
 *
 * Created by Britton Katnich on February 27th, 2019.
 * Copyright © 2018 Britton Katnich. All rights reserved.
 */

const express = require('express');

// Path at this point should be /api
let router = express.Router();
// router.use('/api', require('./v1'));

router.get('/api', (req, res) => {
  res.send('Hey there ... you are in my api directory');
});

module.exports = router;
