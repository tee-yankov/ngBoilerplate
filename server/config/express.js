'use strict';
var express = require('express'),
    favicon = require('serve-favicon'),
    morgan = require('morgan'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    errorHandler = require('errorhandler'),
    path = require('path'),
    config = require('./environment'),
    passport = require('passport'),
    session = require('express-session');
/*    mongoStore = require('connect-mongo')(session),
    mongoose = require('mongoose');*/

module.exports = function(app) {
    var env = app.get('env');

    app.use(compression());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(passport.initialize());

/*    // Persist sessions with mongoStore for oAuth 1 strategies
    // We need to enable sessions for passport twitter because its an oauth 1.0 strategy
    app.use(session({
        secret: config.secrets.session,
        resave: true,
        saveUninitialized: true,
        store: new mongoStore({ mongooseConnection: mongoose.connection })
    }));*/

    if ('production' === env) {
        app.use(favicon(path.join(config.root, 'build', 'favicon.ico')));
        app.use(express.static(path.join(config.root, 'build')));
        app.use('/bower_components', express.static(path.join(config.root, 'bower_components')));
        app.use('/assets', express.static(path.join(config.root, 'assets')));
        app.set('appPath', config.root + '/build');
        app.use(morgan('dev'));
        app.use(errorHandler());
    }
    if ('development' === env) {
        app.use(favicon(path.join(config.root, 'client', 'favicon.ico')));
        app.use(express.static(path.join(config.root, 'client')));
        app.use('/bower_components', express.static(path.join(config.root, 'bower_components')));
        app.use('/assets', express.static(path.join(config.root, 'assets')));
        app.set('appPath', config.root + '/client');
        app.use(morgan('dev'));
        app.use(errorHandler());
    }
};
