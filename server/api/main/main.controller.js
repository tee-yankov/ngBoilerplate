'use strict';

var Main = require('./main.model.js');

exports.index = function(req, res) {
    Main.find(function(err, main) {
        if (err) { return res.status(500).json({ err: 'Bugger off!' }); }
        return res.status(200).json({ message: main });
    });
};

exports.create = function(req, res) {
    if (!req.body.message) { return res.status(500).json({ err: 'You need to have a message key!' }); }
    Main.create(req.body, function(err, main) {
        if(err) { return res.status(500).json({ err: 'Whoops!' }); }
        return res.status(201).json(main);
    });
};

exports.destroy = function(req, res) {
    Main.remove(function(err) {
        if (err) { return res.status(500).json({ err: 'Couldnt delete document.'}); }
        res.status(300).json({ message: 'Successfully deleted document Main!' });
    });
};
