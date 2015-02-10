'use strict';

var express = require('express'),
    passport = require('passport'),
    config = require('../config/environment'),
    User = require('../api/user/user.model');

/** Passport Configuration */
require('./local/passport').setup(User, config);
require('./linkedin/passport').setup(User, config);

var router = express.Router();

router.use('/local', require('./local'));
router.use('/linkedin', require('./linkedin'));

module.exports = router;
