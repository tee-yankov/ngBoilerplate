'use strict';

module.exports = function(app) {
    app.use('/api/main', require('./api/main'));

    app.route('/*')
    .get(function(req, res) {
        res.sendFile(app.get('appPath') + '/index.html');
    });
};
