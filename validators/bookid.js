const { param } = require("express-validator");
const { getBook } = require("../models/bookModel");

const validateBookId = [
  param("id")
    .isInt({ min: 1 })
    .bail()
    .withMessage("Invalid value, id must be a positive integer")
    .custom(async (value) => {
      const existingBook = await getBook(value);

      if (!existingBook) {
        throw new Error("Book with such an ID doesn't exist");
      }
      return true;
    }),
];
module.exports = validateBookId;
