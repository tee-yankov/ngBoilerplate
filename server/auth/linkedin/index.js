'use strict';

var express = require('express'),
    passport = require('passport'),
    auth = require('../auth.service');

var router = express.Router();

router
.get('/', passport.authenticate('linkedin', {
    state: 'DCEEEF',
    session: false
}))

.get('/callback', passport.authenticate('linkedin', {
    failureRedirect: '/login',
    session: false
}), auth.setTokenCookie);

module.exports = router;
