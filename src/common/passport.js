/**
 * logger.js
 *
 * Created by Britton Katnich on February 27th, 2019.
 * Copyright © 2018 Britton Katnich. All rights reserved.
 */

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function (email, password, done) {
  User.findOne({ email: email }).then(function (user) {
    if (!user || !user.validPassword(password)) {
      return done(null, false, { errors: { 'email or password': 'is invalid' } });
    }

    return done(null, user);
  }).catch(done);
}));
