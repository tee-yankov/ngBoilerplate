'use strict';

var passport = require('passport'),
    auth = require('../auth.service'),
    express = require('express'),
    router = express.Router();

router
.get('/', passport.authenticate('facebook', {
    scope: ['email'],
    failureRedirect: '/login',
    session: false
}))

.get('/callback', passport.authenticate('facebook', {
    failureRedirect: '/login',
    session: false
}), auth.setTokenCookie);

module.exports = router;
