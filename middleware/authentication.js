const { verifyToken } = require("../library/jwt");
const pool = require("../config/config");
const queries = require("../src/queries");

const authentication = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw { name: "Unauthenticated" };
    }
    const accessToken = req.headers.authorization.split(" ")[1];
    //decode token
    const { id, email, role } = verifyToken(accessToken);

    const result = await pool.query(queries.checkIdAuth, [id]);

    if (!result.rows.length) {
      throw { name: "Unauthenticated" };
    } else {
      //Terautentikasi
      const foundUser = result.rows[0];
      // Custom property req.loggedUser
      req.loggedUser = {
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role,
      };
      //next ke middleware selanjutnya, authorization
      next();
    }
  } catch (err) {
    next(err);
  }
};
const authorization = (req, res, next) => {
  try {
    const { role } = req.loggedUser;
    if (role === "admin") {
      next();
    } else {
      throw { name: "Unauthorized" };
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  authentication,
  authorization,
};
