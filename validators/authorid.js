const { param } = require("express-validator");
const { getOne } = require("../models/authorModel");

const validateAuthorId = [
  param("id")
    .isInt({ min: 1 })
    .bail()
    .withMessage("Invalid value, id must be a positive integer")
    .custom(async (value) => {
      const existingAuthor = await getOne(value);

      if (!existingAuthor) {
        throw new Error("Author with such an ID doesn't exist");
      }
      return true;
    }),
];
module.exports = validateAuthorId;
