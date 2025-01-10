const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength:[3,'First name must be at least 3 character long']
        },
        lastname: {
            type: String,
            minlength:[3,'Last name must be at least 3 character long']
        },
    },
    email: {
        type: String,
        required: true,
        unique:true,
        minlength: [5, 'Email must be at least 5 character long']
    },
    password: {
        type: Number,
        required: true,
        select:false
    },
    socketId: {
        type: String,
    }
})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY, { expiresIn: '24h' });
    return token;
}

userSchema.methods.comaprePassword = async function (password) {
    return await bcrypt.comapre(password, this.password);
}

userSchema.methods.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}


const userModel = mongoose.model('user', userSchema);

module.exports = userModel;

