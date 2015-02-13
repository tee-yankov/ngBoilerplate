var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;

exports.setup = function(User, config) {
    passport.use(new FacebookStrategy({
        clientID: '615886668513609',
        clientSecret: 'acc436a450418603733f17c7177de3d2',
        callbackURL: process.env.DOMAIN + '/auth/facebook/callback'
    }, function(accessToken, refreshToken, profile, done) {
        User.findOne({
            'facebook.id': profile.id
        }, function(err, user) {
            if (!user) {
                user = new User({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    role: 'user',
                    provider: 'facebook',
                    facebook: profile._json
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
