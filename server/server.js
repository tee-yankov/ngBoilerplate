'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express'),
    config = require('./config/environment'),
    app = express(),
    server = require('http').createServer(app);

require('./config/express')(app);
require('./routes')(app);

// Start the server
server.listen(config.port, config.ip, function() {
    console.log('Server listening on %d in %s mode', config.port, app.get('env'));
});

exports = module.exports = app;
