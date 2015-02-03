'use strict';

module.exports = function(app) {
    app.use('/api/main', require('./api/main'));
    app.use('/api/user', require('./api/user'));

    app.use('/auth', require('./auth'));

    app.route('/*')
    .get(function(req, res) {
        res.sendFile(app.get('appPath') + '/index.html');
    });
};
