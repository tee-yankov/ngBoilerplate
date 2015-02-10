'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto'),
    authTypes = ['facebook', 'google', 'linkedin'];

var UserSchema = new Schema({
    name: String,
    email: { type: String, lowercase: true },
    role: {
        type: String,
        default: 'user'
    },
    hashedPassword: String,
    provider: String,
    salt: String,
    linkedin: {},
    google: {},
    facebook: {}
});

/**
 * Virtuals
 */
UserSchema
.virtual('password')
.set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
})
.get(function() {
    return this._password;
});

// Public profile information
UserSchema
.virtual('profile')
.get(function() {
    return {
        'name': this.name,
        'role': this.role,
    };
});

UserSchema
.virtual('token')
.get(function() {
    return {
        '_id': this._id,
        'role': this.role
    };
});

/**
 * Validations
 */

// Validate empty email
UserSchema
.path('email')
.validate(function(email) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return email.length >= 3 &&
        email.length < 254;
}, 'Email must be at least 3 characters and at most 254 characters');

// Validate email validity
UserSchema
.path('email')
.validate(function(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}, 'Invalid email');

// Validate empty password
UserSchema
.path('hashedPassword')
.validate(function(hashedPassword) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return (hashedPassword.length);
}, 'Password cannot be blank');

// Validate password length
UserSchema
.path('name')
.validate(function(password) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return this._password.length > 6 &&
        this._password.length < 64;
}, 'Password must be longer than 6 symbols and shorter than 64');

// Validate email is not taken
UserSchema
.path('email')
.validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({ email: value }, function(err, user) {
        if (err) throw err;
        if (user) {
            if (self.id === user.id) return respond(true);
            return respond(false);
        }
        respond(true);
    });
}, 'The specified email address is already in use.');

var validatePresenceOf = function(value) {
    return value && value.length;
};

/**
 * Pre-save hook
 */
UserSchema
.pre('save', function(next) {
    if (!this.isNew) return next();

    if (!validatePresenceOf(this.hashedPassword) && authTypes.indexOf(this.provider) === -1)
        next(new Error('Invalid password'));
    else {
        next();
    }
});

/**
 * Methods
 */
UserSchema.methods = {
    /**
     * Authenticate - check if passwords are the same
     *
     * @param {string} plainText
     * @return {boolean}
     * @api public
     */
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashedPassword;
    },

    /**
     * Make salt
     *
     * @return {string}
     * @api public
     */
    makeSalt: function() {
        return crypto.randomBytes(16).toString('base64');
    },

    /**
     * Encrypt password
     *
     * @param {string} password
     * @return {string}
     * @api public
     */
    encryptPassword: function(password) {
        if (!password || !this.salt) { return ''; }
        var salt = new Buffer(this.salt, 'base64');
        return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
    }
};


module.exports = mongoose.model('User', UserSchema);
