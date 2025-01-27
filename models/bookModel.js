const { sql } = require("../dbConnection");

exports.getBooks = async (limit, offset) => {
  const books = await sql`
 SELECT books.*, json_agg(authors) AS author
FROM books
JOIN authors ON books.authorid = authors.id
GROUP BY books.id
ORDER BY books.id ASC
${
  !isNaN(limit) && !isNaN(offset) ? sql`LIMIT ${limit} OFFSET ${offset}` : sql``
}  
                                `;

  return books;
};

exports.getBook = async (id) => {
  const [book] = await sql`
 SELECT 
    books.*, 
    json_agg(authors) AS author
FROM books
JOIN authors ON books.authorid = authors.id
WHERE books.id = ${id}
GROUP BY books.id;

                                `;
  return book;
};

exports.createBook = async (newBook) => {
  const [book] = await sql`
 INSERT INTO books ${sql(newBook, "title", "summary", "isbn", "authorid")}
 
 RETURNING * `;
  return book;
};

exports.updateBook = async (id, updatedBook) => {
  const [book] = await sql`
                  UPDATE books
                  SET ${sql(updatedBook, "title", "summary", "isbn", "authorid")}
                  WHERE id = ${id}
                  RETURNING *
                  `;
  return book;
};

exports.deleteBook = async (id) => {
  const [book] = await sql`
                  DELETE FROM books
                  WHERE id = ${id}
                  RETURNING *
                  `;
  return book;
};

exports.filterBooks = async (filter) => {
  const titleFilter = filter.title ? `%${filter.title}%` : "%";

  const books = await sql`
      SELECT * 
      FROM books
      WHERE title ILIKE ${titleFilter}  
    `;

  return books;
};
