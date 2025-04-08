# Library API
This is the backend server for a full-featured Library Management System. It handles user authentication, book and author CRUD operations, filtering, pagination, and role-based access (admin/user).

## Features
### Authentication
Secure signup & login (with Argon2 hashing)

JWT-based authentication stored in HTTP-only cookies

Role-based access control (user & admin)

### Books
CRUD operations on books (admin only)

Supports pagination and filtering (by title)

ISBN validation (###-##-####-#)

### Authors
CRUD operations on authors (admin only)

Authors include their associated books (with aggregation)

Filtering by ID with sort direction

## Tech Stack
Runtime: Node.js

Framework: Express

Database: PostgreSQL

Auth: JWT + Argon2

Validation: express-validator

Error Handling: Custom error class with centralized middleware

