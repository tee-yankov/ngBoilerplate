'use strict';

var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy,
    passport = require('passport');

exports.setup = function(User, config) {
    passport.use(new LinkedInStrategy({
        clientID: '75wb1drd0nlgji',
        clientSecret: 'xudX98aEdxSwksCn',
        callbackURL: 'http://127.0.0.1:3000/auth/linkedin/callback',
        scope: ['r_emailaddress', 'r_basicprofile'],
        state: true
    }, function(accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {
            // To keep the example simple, the user's LinkedIn profile is returned to
            // represent the logged-in user. In a typical application, you would want
            // to associate the LinkedIn account with a user record in your database,
            // and return that user instead.
            return done(null, profile);
        });
    }));
};
