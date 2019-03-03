/**
 * index.js
 *
 * Created by Britton Katnich on February 27th, 2019.
 * Copyright © 2018 Britton Katnich. All rights reserved.
 */

const express = require('express');

let router = express.Router();

router.use(function (err, req, res, next) {
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function (errors, key) {
        errors[key] = err.errors[key].message;

        return errors;
      }, {})
    });
  }

  return next(err);
});

// Path at this point should be /api
router.use('/api', require('./v1'));

router.get('/api', (req, res) => {
  res.send('Hey there ... you are in my api directory');
});

module.exports = router;
