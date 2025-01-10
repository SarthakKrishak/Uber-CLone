const { validationResult} = require("express-validator");
const userModel = require("../models/user.model");
const userService = require("../services/user.services");
const blacklistedModel = require("../models/blacklisted.model");



module.exports.registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    let { fullname, email, password } = req.body;

    const isUserExist = await userModel.findOne({ email });
    if (isUserExist) {
        return res.status(400).json({ message: "User already exist" });
    }

    const hashPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword
    });

    const token = await userModel.generateAuthToken();

    res.status(201).json({ token, user });


}

module.exports.loginUser = async (req, res) => {
    const error = ExpressValidator(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password")

    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" })
    }

    const isMatch = await user.comaprePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' })
    }

    const token = user.generateAuthToken();
    res.cookie('token', token);
    res.status(201).json({ token, user });
}

module.exports.getUserProfile = async (req, res) => {
    return res.status(201).json(req.user);
}

module.exports.logoutUser = async (req, res) => {
    res.clearCookie('token');
    const token = req.cookie.token || req.headers.authorization.split(" ")[1];
    await blacklistedModel.create({ token })
    res.status(201).json({ message: "Logged Out" });

}

