'use strict';
var express = require('express'),
    controller = require('./main.controller'),
    auth = require('../../auth/auth.service'),
    router = express.Router();

/** Routes for the Main controller */
router.get('/', controller.index);
router.post('/', auth.isAuthenticated(), controller.create);
router.delete('/', auth.isAuthenticated(), controller.destroy);

module.exports = router;
