const express = require("express");
const validate = require("../validators/validate");
const { signup, login } = require("../controllers/authController");
const validateLogin = require("../validators/login");
const validateRegistration = require("../validators/register");

const router = express.Router();

router.route("/register").post(validateRegistration, validate, signup);
router.route("/login").post(validateLogin, validate, login);

module.exports = router;
