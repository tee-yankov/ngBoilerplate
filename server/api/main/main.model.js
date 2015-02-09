var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MainSchema = new Schema({
    message: { type: String, required: true }
});

module.exports = mongoose.model('Main', MainSchema);

/**
 * Validations
 */

// Validate message length.
MainSchema
.path('message')
.validate(function(message) {
    if (message) {
        return message.length &&
            message.length < 254;
    } return false;
}, 'Message cannot be blank or more than 254 characters');
