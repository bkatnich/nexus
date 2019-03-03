/**
 * users.js
 *
 * Created by Britton Katnich on February 16th, 2019.
 * Copyright © 2018 Britton Katnich. All rights reserved.
 */

const mongoose = require('mongoose');
const router = require('express').Router();
const passport = require('passport');
const User = mongoose.model('User');
const auth = require('../../auth');
const winston = require('winston')

router.get('/', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    return res.json({ user: user.toAuthJSON() });
  }).catch(next);
});

router.put('/', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    // only update fields that were actually passed...
    if (typeof req.body.username !== 'undefined') {
      user.username = req.body.username;
    }
    if (typeof req.body.user.email !== 'undefined') {
      user.email = req.body.email;
    }
    if (typeof req.body.user.bio !== 'undefined') {
      user.bio = req.body.bio;
    }
    if (typeof req.body.user.image !== 'undefined') {
      user.image = req.body.image;
    }
    if (typeof req.body.user.password !== 'undefined') {
      user.setPassword(req.body.password);
    }

    return user.save().then(function () {
      return res.json({ user: user.toAuthJSON() });
    });
  }).catch(next);
});

router.post('/login', function (req, res, next) {
  winston.debug("called login");
  if (!req.body.email) {
    return res.status(422).json({ errors: { email: "can't be blank" } });
  }

  if (!req.body.password) {
    return res.status(422).json({ errors: { password: "can't be blank" } });
  }

  winston.debug("login done validation");

  passport.authenticate('local', { session: false }, function (err, user, info) {
    if (err) { return next(err); }

    if (user) {
      user.token = user.generateJWT();
      return res.json({ user: user.toAuthJSON() });
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

router.post('/', function (req, res, next) {
  winston.info('called to create user with req: ' + JSON.stringify(req.body));
  let user = new User();

  user.username = req.body.username;
  user.email = req.body.email;
  user.setPassword(req.body.password);

  user.save().then(function () {
    return res.json({ user: user.toAuthJSON() });
  }).catch(next);

  //res.status(200).send('called')
});

module.exports = router;
