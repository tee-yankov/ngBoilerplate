'use strict';
var express = require('express'),
    controller = require('./main.controller'),
    router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.delete('/', controller.destroy);

module.exports = router;
