const express = require('express')
const router = express.Router();
const { body } = require('express-validator');
const { registerUser, loginUser, getUserProfile, logoutUser } = require("../controllers/user.controller");
const { authUser } = require('../middleware/auth.middleware');




router.post("/register", [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname").isLength({ min: 3 }).withMessage("First name should have more than 3 characters"),
    body("password").isLength({ min: 6 }).withMessage("Last name should have 6 length")
], registerUser);

router.post("/login", [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({ min: 6 }).withMessage("Last name should have 6 length")
],loginUser)


router.get("/profile", authUser, getUserProfile);

router.get("/logout",authUser,logoutUser)


module.exports = router;