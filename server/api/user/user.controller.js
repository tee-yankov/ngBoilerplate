'use strict';
var User = require('./user.model'),
    passport = require('passport'),
    config = require('../../config/environment'),
    jwt = require('jsonwebtoken'),
    multiparty = require('multiparty'),
    fs = require('fs');

var validationError = function(res, err) {
    return res.status(422).json(err);
};

/**
 * Returns all users in the database.
 * Route needs to be protected!
 */
exports.index = function(req, res) {
    User.find({}, '-salt -hashedPassword', function(err, users) {
        if (err) { return res.status(500).json(err); }
        return res.status(200).json(users);
    });
};

/**
 * Creates a new user
 */
exports.create = function(req, res, next) {
    var newUser = new User(req.body);
    newUser.provider = 'local';
    newUser.role = 'user';
    newUser.save(function(err, user) {
        if (err) return validationError(res, err);
        var token = jwt.sign({ _id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
        res.json({ token: token });
    });
};

exports.destroy = function(req, res, next) {
    User.remove(function(err) {
        if (err) { return res.status(500).json({err: 'Couldn\'t delete User collection!'}); }
        res.status(300).json({ message: 'Successfully deleted User collection!' });
    });
};

exports.me = function(req, res, next) {
    var userId = req.user._id;
    User.findOne({
        _id: userId
    }, '-salt -hashedPassword', function(err, user) {
        if (err) { return next(err); }
        if (!user) { return res.status(401).json({message: 'No such user'}); }
        res.json(user);
    });
};
