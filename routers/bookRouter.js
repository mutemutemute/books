const express = require("express");
const validate = require("../validators/validate");
const {
  getAllBooks,
  getOneBook,
  createNewBook,
  updateThisBook,
  deleteThisBook,
  getFilteredBooks,
} = require("../controllers/bookController");
const { protect, allowAccessTo } = require("../controllers/authController");
const validateNewBook = require("../validators/newbook");
const validateBookId = require("../validators/bookid");

const router = express.Router();
router
  .route("/")
  .get(validate, getAllBooks)
  .post(
    protect,
    allowAccessTo("admin"),
    validateNewBook,
    validate,
    createNewBook
  );
router.route("/filter").get(validate, getFilteredBooks);
router
  .route("/:id")
  .get(validateBookId, validate, getOneBook)
  .patch(
    protect,
    allowAccessTo("admin"),
    validateNewBook,
    validateBookId,
    validate,
    updateThisBook
  )
  .delete(
    protect,
    allowAccessTo("admin"),
    validateBookId,
    validate,
    deleteThisBook
  );

module.exports = router;
