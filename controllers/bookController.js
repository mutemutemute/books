const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  filterBooks,
} = require("../models/bookModel");

exports.getAllBooks = async (req, res, next) => {
  try {
    let { page, limit } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const offset = (page - 1) * limit;

    const books = await getBooks(limit, offset);

    res.status(200).json({
      status: "success",
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

exports.getOneBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await getBook(id);
    res.status(200).json({
      status: "success",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

exports.createNewBook = async (req, res, next) => {
  const newBook = req.body;
  try {
    const createdBook = await createBook(newBook);
    res.status(201).json({
      status: "success",
      data: createdBook,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateThisBook = async (req, res, next) => {
  const { id } = req.params;
  const updatedBook = req.body;
  try {
    const book = await updateBook(id, updatedBook);
    res.status(200).json({
      status: "success",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteThisBook = async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await deleteBook(id);
    book.id = undefined;
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.getFilteredBooks = async (req, res, next) => {
  try {
    const filter = req.query;

    if (Object.keys(filter).length === 0) {
      const books = await getBooks();
      res.status(200).json({
        status: "success",
        data: books,
      });
      return;
    }

    const filteredBooks = await filterBooks(filter);

    res.status(200).json({
      status: "success",
      data: filteredBooks,
    });
  } catch (error) {
    next(error);
  }
};
