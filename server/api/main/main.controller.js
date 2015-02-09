'use strict';

var Main = require('./main.model.js');

var validationError = function(res, err) {
    return res.status(422).json(err);
};

/** Returns all the items in the entire collection. */
exports.index = function(req, res) {
    Main.find(function(err, main) {
        if (err) { return res.status(500).json({ err: 'Bugger off!' }); }
        return res.status(200).json({ message: main });
    });
};

/**
 * Creates a single message
 * @param {string} message - Creates a new Message with the given string.
 */
exports.create = function(req, res) {
    Main.create(req.body, function(err, main) {
        if (err) { return validationError(res, err); }
        return res.status(200).json(main);
    });
};

/** Deletes the entire document */
exports.destroy = function(req, res) {
    Main.remove(function(err) {
        if (err) { return res.status(500).json({ err: 'Couldn\'t delete document.'}); }
        res.status(200).json({ message: 'Successfully deleted document Main!' });
    });
};
