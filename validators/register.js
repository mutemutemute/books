const { body } = require("express-validator");

const validateRegistration = [
  body("username").notEmpty().withMessage("Username is required"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character"
    )
    .custom((value, { req }) => {
      if (value !== req.body.passwordconfirm) {
        throw new Error("Password and password confirm do not match");
      }
      return true;
    }),
];

module.exports = validateRegistration;
