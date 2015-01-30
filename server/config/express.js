'use strict';
var express = require('express'),
    // favicon = require('serve-favicon'),
    morgan = require('morgan'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    errorHandler = require('errorhandler'),
    path = require('path'),
    config = require('./environment');

module.exports = function(app) {
    var env = app.get('env');

    app.use(compression());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser());
    if ('development' === env) {
        // app.use(favicon(path.join(config.root, 'client', 'favicon.png')));
        app.use(express.static(path.join(config.root, 'client')));
        app.use('/bower_components', express.static(path.join(config.root, 'bower_components')));
        app.use('/assets', express.static(path.join(config.root, 'assets')));
        app.set('appPath', config.root + '/client');
        app.use(morgan('dev'));
        app.use(errorHandler());
    }
};
