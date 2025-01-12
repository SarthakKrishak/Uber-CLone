const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const blacklistedModel = require("../models/blacklisted.model");
const captainModel = require('../models/captain.model.js')
module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
    }

    const isBlackListed = await blacklistedModel.findOne({ token });

    if (isBlackListed) {
        res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await userModel.findById(decoded._id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        req.user = user;
        return next();
    } catch (error) {
        return res.status(201).json({ mesaage: "Unauthorized" });
    }
};

module.exports.authCaptain = async (req,res,next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
    }
    const isBlackListed = await blacklistedModel.findOne({ token });

    if (isBlackListed) {
        res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const captain = await captainModel.findById(decoded._id);
        if (!captain) {
            res.status(404).json({ message: "Captain not found" });
        }
        req.captain = captain;
        return next();
    } catch (error) {
        return res.status(201).json({ mesaage: "Unauthorized" });
    }
}