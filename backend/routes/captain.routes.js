const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { registerCaptain } = require('../controllers/captain.controller');


router.post("/register", [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname").isLength({ min: 3 }).withMessage("First name should have more than 3 characters"),
    body("password").isLength({ min: 6 }).withMessage("Last name should have 6 length"),
    body("vehicle.color").isLength({ min: 3 }).withMessage("Color should have 3 length"),
    body("vehicle.plate").isLength({ min: 3 }).withMessage("Model should have 3 length"),
    body("vehicle.capacity").isLength({ min: 1 }).withMessage("capacity should have 1 length"),
    body("vehicle.vehicleType").isIn(['car', 'auto', 'motorcycle']).withMessage("Invalid vehicle type")
],registerCaptain)

module.exports = router;