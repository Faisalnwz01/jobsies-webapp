'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router
  .get('/', passport.authenticate('linkedin', {
    failureRedirect: '/login',
    scope: [
      'r_basicprofile',
      'r_emailaddress',
      'r_contactinfo',
      'r_fullprofile'
    ],
    session: false
  }))

  .get('/callback', passport.authenticate('linkedin', {
    failureRedirect: '/login',
    session: false
  }), auth.setTokenCookie);

module.exports = router;