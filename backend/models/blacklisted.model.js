/**
 * BlacklistToken Model
 * ---------------------
 * This schema is used to store blacklisted JWT tokens that should no longer be accepted.
 * Tokens will automatically expire and be removed from the database after 24 hours.
 */

const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // 24 hours in seconds
    }
});

module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);