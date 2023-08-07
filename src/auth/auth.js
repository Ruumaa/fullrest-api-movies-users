const express = require("express");
const pool = require("../../config/config");
const router = express.Router();
const bcrypt = require("bcrypt");
const queries = require("../queries");
const {generateToken} = require("../../library/jwt");
const salt = bcrypt.genSaltSync(10);

//POST user
router.post("/register", async (req, res, next) => {
  try {
    const { id, email, gender, password, role } = req.body;
    //check Id
    pool.query(queries.checkIdAuth, [id], (err, result) => {
      if (result.rows.length) {
        return res.status(409).send("Id already exist!");
      } else {
        // Hashing password menggunakan bcrypt
        const hashPassword = bcrypt.hashSync(password, salt);

        // Menyimpan `hashPassword` ke dalam database
        pool.query(
          queries.insertData,
          [id, email, gender, hashPassword, role],
          (err, result) => {
            if (err) {
              throw err;
            }
            res.status(201).json({
              message: "User created successfully!",
              email,
              role,
            });
          }
        );
      }
    });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(queries.checkEmail, [email]);

    if (!result.rows.length) {
      throw { name: "ErrorNotFound" };
    } else {
      const foundUser = result.rows[0];
      //mengecek password yg dimasukkan dengan yg ada di db(dari foundUser) dgn bentuk HashPass
      const isValid = bcrypt.compareSync(password, foundUser.password);

      //check password valid
      if (isValid) {
        const accessToken = generateToken({
          id: foundUser.id,
          email: foundUser.email,
          role: foundUser.role,
        });
        res.status(200).json({ message: "Login Success!", accessToken });
      } else {
        throw { name: "InvalidCredentials" };
      }
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
