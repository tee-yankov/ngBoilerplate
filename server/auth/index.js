'use strict';

var express = require('express'),
    passport = require('passport'),
    config = require('../config/environment'),
    User = require('../api/user/user.model');

/** Passport Configuration */
require('./local/passport').setup(User, config);
require('./linkedin/passport').setup(User, config);
require('./google/passport').setup(User, config);
require('./facebook/passport').setup(User, config);

var router = express.Router();

router.use('/local', require('./local'));
router.use('/linkedin', require('./linkedin'));
router.use('/google', require('./google'));
router.use('/facebook', require('./facebook'));

module.exports = router;
