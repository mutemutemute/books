const {
  getAll,
  getOne,
  create,
  update,
  deleteAuthor,
  filterAuthors,
} = require("../models/authorModel");

exports.getAllAuthors = async (req, res, next) => {
  try {
    const authors = await getAll();
    res.status(200).json({
      status: "success",
      data: authors,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAuthorById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const author = await getOne(id);
    res.status(200).json({
      status: "success",
      data: author,
    });
  } catch (error) {
    next(error);
  }
};

exports.createNewAuthor = async (req, res, next) => {
  const newAuthor = req.body;
  try {
    const createdAuthor = await create(newAuthor);
    res.status(201).json({
      status: "success",
      data: createdAuthor,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateAuthor = async (req, res, next) => {
  const { id } = req.params;
  const updatedAuthor = req.body;
  try {
    const author = await update(id, updatedAuthor);
    res.status(200).json({
      status: "success",
      data: author,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteThisAuthor = async (req, res, next) => {
  const { id } = req.params;
  try {
    const author = await deleteAuthor(id);
    author.id = undefined;
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.getFilteredAuthors = async (req, res, next) => {
  try {
    const filter = req.query;

    if (Object.keys(filter).length === 0) {
      const authors = await getAll();
      res.status(200).json({
        status: "success",
        data: authors,
      });
      return;
    }

    const filteredAuthors = await filterAuthors(filter);

    res.status(200).json({
      status: "success",
      data: filteredAuthors,
    });
  } catch (error) {
    next(error);
  }
};
