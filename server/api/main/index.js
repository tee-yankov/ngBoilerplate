'use strict';
var express = require('express'),
    controller = require('./main.controller'),
    router = express.Router();

/** Routes for the Main controller */
router.get('/', controller.index);
router.post('/', controller.create);
router.delete('/', controller.destroy);

module.exports = router;
