const { body } = require("express-validator");
const argon2 = require("argon2");
const { getUserByUsername } = require("../models/authModel");

const validateLogin = [
  body("username").notEmpty().withMessage("Username is required"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .custom(async (value, { req }) => {
      const existingUser = await getUserByUsername(req.body.username);
      if (existingUser) {
        const match = await argon2.verify(existingUser.password, value);
        if (!match) {
          throw new Error("Password is incorrect");
        }

        return true;
      } else {
        throw new Error("User with this Username does not exist");
      }
    }),
];

module.exports = validateLogin;
