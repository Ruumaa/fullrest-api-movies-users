const pool = require("../../config/config");
const queries = require("../queries");
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

// GET ALL
const getMovies = async (req, res, next) => {
  try {
    let { page, limit } = req.query;
    page = +page || DEFAULT_PAGE;
    limit = +limit || DEFAULT_LIMIT;
    let itemsPerPage = (page - 1) * limit;

    const result = await pool.query(queries.getMovies, [limit, itemsPerPage]);

    let totalData = await pool.query(queries.countQuery);
    totalData = +totalData.rows[0].count;

    let totalPages = Math.ceil(totalData / limit);

    let next = page < totalPages ? page + 1 : null;
    let previous = page > 1 ? page - 1 : null;

    res.status(200).json({
      data: result.rows,
      totalPages,
      totalData,
      currentPage: page,
      next,
      previous,
    });
  } catch (err) {
    next(err);
  }
};

// GET by Id
const getMovieById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const result = await pool.query(queries.getMovieById, [id]);
    if (!result.rows) {
      throw { name: "ErrorNotFound" };
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (err) {
    next(err);
  }
};

// POST
const addMovie = async (req, res, next) => {
  try {
    const { id, title, genres, year } = req.body;
    const checkId = await pool.query(queries.checkIdExist, [id]);
    if (checkId.rows.length) {
      res.send("Id already exist!");
    } else {
      const result = await pool.query(queries.addMovie, [
        id,
        title,
        genres,
        year,
      ]);
      if (result) {
        res.status(200).send("Movie added succesfully!");
      } else {
        throw { name: "Error" };
      }
    }
  } catch (err) {
    next(err);
  }
};

//DELETE
const deleteMovie = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const checkId = await pool.query(queries.getMovieById, [id]);
    if (!checkId.rows.length) {
      res.send("Movie not found!");
    } else {
      const result = await pool.query(queries.deleteMovie, [id]);
      if (result) {
        res.status(200).send("Movie deleted succesfully!");
      } else {
        throw { name: "Error" };
      }
    }
  } catch (err) {
    next(err);
  }
};

// PUT / Update
const updateMovie = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { title, genres, year } = req.body;
    const checkId = await pool.query(queries.getMovieById, [id]);
    if (!checkId.rows.length) {
      res.send("Movie not found!");
    } else {
      const result = await pool.query(queries.updateMovie, [
        title,
        genres,
        year,
        id,
      ]);
      if (result) {
        res.status(200).send("Movie updated succesfully!");
      } else {
        res.status(500).send("Failed to update movie!");
      }
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMovies,
  getMovieById,
  addMovie,
  deleteMovie,
  updateMovie,
};
