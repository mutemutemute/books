const { body } = require("express-validator");
const { getOne } = require("../models/authorModel");

const regEx = /^\d{3}-\d{2}-\d{4}-\d{1}$/;

const validateNewBook = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),

  body("summary")
    .optional()
    .isString()
    .withMessage("Summary must be a string")
    .isLength({ max: 150 })
    .withMessage("Summary must be at most 150 characters long"),

  body("isbn")
    .notEmpty()
    .withMessage("ISBN is required")
    .matches(regEx)
    .withMessage("Invalid ISBN format"),

  body("authorid")
    .notEmpty()
    .withMessage("Author ID is required")
    .isNumeric()
    .withMessage("Author ID must be a number")
    .custom(async (value) => {
      const existingAuthor = await getOne(value);

      if (!existingAuthor) {
        throw new Error("Author with such an ID doesn't exist");
      }
      return true;
    }),
];

module.exports = validateNewBook;
