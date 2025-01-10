const mongoose = require('mongoose')

const blacklistedTokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400  // 24 hr in sec
    }
})


module.exports = mongoose.model('BlacklistedToken', blacklistedTokenSchema);
