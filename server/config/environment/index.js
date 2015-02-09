'use strict';
var path = require('path'),
    _ = require('lodash');

var all = {
    env: process.env.NODE_ENV,

    root: path.normalize(__dirname + '/../../..'),

    port: process.env.PORT || 3000,

    secrets: {
        session: process.env.SESSION_SECRET || 'ng-boilerplate-secret'
    },

    userRoles: ['guest', 'user', 'admin'],

    mongo: {
        options: {
            db: {
                safe: true
            }
        }
    }
};

module.exports = _.merge(all, require('./' + process.env.NODE_ENV + '.js') || {});
