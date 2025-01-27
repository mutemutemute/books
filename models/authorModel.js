const { sql } = require("../dbConnection");

exports.getAll = async () => {
  const authors = await sql`
                SELECT authors.*, json_agg(books) AS books
                FROM authors
                JOIN books ON authors.id = books.authorid
                GROUP BY authors.id
                `;
  return authors;
};

exports.getOne = async (id) => {
  const [author] = await sql`
                SELECT authors.*, json_agg(books) AS books
                FROM authors
                JOIN books ON authors.id = books.authorid
                WHERE authors.id = ${id}
                GROUP BY authors.id
                `;
  return author;
};

exports.create = async (newAuthor) => {
  const [createdAuthor] = await sql`
                INSERT INTO authors ${sql(newAuthor, "name", "birthdate", "biography")}
               
                RETURNING *
                `;
  return createdAuthor;
};

exports.update = async (id, updatedAuthor) => {
  const [author] = await sql`
                UPDATE authors
                SET ${sql(updatedAuthor, "name", "birthdate", "biography")}
                WHERE id = ${id}
                RETURNING *
                `;
  return author;
};

exports.deleteAuthor = async (id) => {
  const [author] = await sql`
                DELETE FROM authors
                WHERE id = ${id}
                RETURNING *
                `;
  return author;
};

exports.filterAuthors = async (filter) => {
  const validDirections = ["ASC", "DESC"];
  const sortDirection = filter.sort
    ? validDirections.includes(filter.sort.toUpperCase())
      ? filter.sort.toUpperCase()
      : "ASC"
    : "ASC";

  const authors = await sql`
      SELECT authors.*, json_agg(books) AS books 
      FROM authors
      JOIN books ON authors.id = books.authorid
      WHERE 
        authors.id = ${filter.authorId} 
      GROUP BY authors.id
      ORDER BY authors.id ${sql.unsafe(sortDirection)}  
    `;

  return authors;
};
