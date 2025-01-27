const { sql } = require("../dbConnection");

exports.createUser = async (newUser) => {
  const [user] = await sql`
        INSERT INTO users ${sql(newUser, "username", "password")}
        RETURNING *
        `;
  return user;
};

exports.getUserByUsername = async (username) => {
  const [user] = await sql`
        SELECT users.*
         FROM users
          WHERE username = ${username}
        `;
  return user;
};

exports.getUserById = async (id) => {
  const [user] = await sql`
        SELECT users.*
         FROM users
          WHERE id = ${id}
        `;
  return user;
};
