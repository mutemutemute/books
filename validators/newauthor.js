const { body } = require("express-validator");

const validateNewAuthor = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long"),

  body("birthdate")
    .notEmpty()
    .withMessage("Birthdate is required")
    .isDate()
    .withMessage("Birthdate must be a valid date"),

  body("biography")
    .optional()
    .isString()
    .withMessage("Biography must be a string")
    .isLength({ max: 150 })
    .withMessage("Biography must be at most 150 characters long"),
];

module.exports = validateNewAuthor;
