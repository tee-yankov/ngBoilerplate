'use strict';
var express = require('express'),
    controller = require('./user.controller'),
    config = require('../../config/environment'),
    auth = require('../../auth/auth.service'),
    router = express.Router();

/** Routes for the User model */
router.get('/', /*auth.hasRole('admin'),*/ controller.index);
router.get('/me', auth.isAuthenticated(), controller.me);
router.post('/', controller.create);
router.delete('/', controller.destroy);

module.exports = router;
