const express = require("express");
const validate = require("../validators/validate");
const {
  getAllAuthors,
  getAuthorById,
  createNewAuthor,
  updateAuthor,
  deleteThisAuthor,
  getFilteredAuthors,
} = require("../controllers/authorController");
const { protect, allowAccessTo } = require("../controllers/authController");
const validateNewAuthor = require("../validators/newauthor");
const validateAuthorId = require("../validators/authorid");

const router = express.Router();

router
  .route("/")
  .get(validate, getAllAuthors)
  .post(
    protect,
    allowAccessTo("admin"),
    validateNewAuthor,
    validate,
    createNewAuthor
  );
router.route("/filter").get(validate, getFilteredAuthors);
router
  .route("/:id")
  .get(validateAuthorId, validate, getAuthorById)
  .patch(
    protect,
    allowAccessTo("admin"),
    validateNewAuthor,
    validateAuthorId,
    validate,
    updateAuthor
  )
  .delete(
    protect,
    allowAccessTo("admin"),
    validateAuthorId,
    validate,
    deleteThisAuthor
  );
module.exports = router;
