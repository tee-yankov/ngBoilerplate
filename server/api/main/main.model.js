var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MainSchema = new Schema({
    message: String
});

module.exports = mongoose.model('Main', MainSchema);
