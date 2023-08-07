const pool = require("../../config/config");
const queries = require("../queries");

// GET ALL user
const getUsers = async (req, res, next) => {
  try {
    const result = await pool.query(queries.getUsers);
    res.status(200).json(result.rows);
  } catch (err) {
    next(err);
  }
};
// GET by Id
const getUserById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const result = await pool.query(queries.checkIdAuth, [id]);
    if (!result.rows.length) {
      res.send("Id not found!");
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const checkId = await pool.query(queries.checkIdAuth, [id]);
    if (!checkId.rows.length) {
      res.send("User not found!");
    } else {
      const result = await pool.query(queries.deleteUser, [id]);
      res.status(200).send("User successfully deleted!");
    }
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try{
    const id = parseInt(req.params.id);
    const {email, gender, role} = req.body;
    const checkId = await pool.query(queries.checkIdAuth, [id]);
    if (!checkId.rows.length) {
      res.send("User not found!");
    } else {
      const result = await pool.query(queries.updateUser, [email, gender, role, id]);
     if(result){
      res.status(200).send("User successfully updated!");
     } else {
      throw {name: "Error"}
     }
    }
  } catch(err){
    next(err)
  }
};

module.exports = {
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
};
