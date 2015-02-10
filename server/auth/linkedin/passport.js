'use strict';

var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy,
    passport = require('passport');


exports.setup = function(User, config) {
    passport.use(new LinkedInStrategy({
        clientID: process.env.LINKEDIN_ID,
        clientSecret: process.env.LINKEDIN_SECRET,
        callbackURL: 'http://127.0.0.1:3000/auth/linkedin/callback',
        scope: ['r_emailaddress', 'r_basicprofile']
    }, function(accessToken, refreshToken, profile, done) {
        User.findOne({
            'linkedin.id': profile.id
        }, function(err, user) {
            if (!user) {
                user = new User({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    role: 'user',
                    provider: 'linkedin',
                    linkedin: profile._json
                });
                user.save(function(err) {
                    if (err) done(err);
                    return done(err, user);
                });
            } else {
                return done(err, user);
            }
        });
    }));
};
