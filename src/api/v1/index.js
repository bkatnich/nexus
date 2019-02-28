/**
 * index.js
 *
 * Created by Britton Katnich on February 16th, 2019.
 * Copyright © 2018 Britton Katnich. All rights reserved.
 */
'use strict';
   
import express from 'express';

// Path at this point should be api/v1
let router = express.Router();
//router.use('/v1', require('./a'));

router.get('/v1', (req, res) => {
    res.send('Hey there ... you are in my api/v1 directory');
});

module.exports = router;