// Movies Queries
const getMovies = "SELECT * FROM movies ORDER BY id ASC LIMIT $1 OFFSET $2";
const countQuery = "SELECT COUNT (*) FROM movies";
const getMovieById = "SELECT * FROM movies WHERE id = $1";
const addMovie =
  "INSERT INTO movies (id, title, genres, year) VALUES($1, $2, $3, $4)";
const checkIdExist = "SELECT * FROM movies WHERE id = $1";
const deleteMovie = "DELETE FROM movies WHERE id = $1";
const updateMovie = "UPDATE movies SET title = $1, genres = $2, year = $3 WHERE id = $4";

//  Users Queries
const getUsers = "SELECT * FROM users ORDER BY id ASC";
const deleteUser = "DELETE FROM users WHERE id = $1";
const updateUser = "UPDATE users SET email = $1, gender = $2, role = $3 WHERE id = $4"

//  Auth Queries
const insertData =
  "INSERT INTO users(id,email,gender,password,role) VALUES ($1, $2, $3, $4, $5)";
const checkIdAuth = "SELECT * FROM users WHERE id = $1";
const checkEmail = "SELECT * FROM users WHERE email = $1";


module.exports = {
  //movies routes
  getMovies,
  countQuery,
  getMovieById,
  addMovie,
  checkIdExist,
  deleteMovie,
  updateMovie,
  //user routes
  getUsers,
  deleteUser,
  updateUser,
  //auth routes
  insertData,
  checkIdAuth,
  checkEmail,
};
