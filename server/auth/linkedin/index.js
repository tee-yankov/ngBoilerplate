'use strict';

var express = require('express'),
    passport = require('passport'),
    auth = require('../auth.service');

var router = express.Router();

router.get('/auth/linkedin',
        passport.authenticate('linkedin', { state: 'SOME STATE'  }),
        function(req, res){
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
});

router.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

module.exports = router;
