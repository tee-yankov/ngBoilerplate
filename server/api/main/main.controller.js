'use strict';

exports.index = function(req, res) {

    return res.status(200)
    .json({ message: 'Everything looks good!' });
};
