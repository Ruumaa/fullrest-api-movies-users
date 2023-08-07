const { Router } = require("express");
const moviesRouter = require("./controller/movies");
const usersRouter = require('./controller/users')
const router = Router();
const authRouter = require("./auth/auth");
const {authentication} = require('../middleware/authentication')
const {authorization} = require('../middleware/authentication')

//Auth Router
router.use("/auth", authRouter);
router.use(authentication)

//Movies Router
router.get("/api/movies/", moviesRouter.getMovies);
router.get("/api/movies/:id", moviesRouter.getMovieById);
router.post("/api/movies/",authorization, moviesRouter.addMovie);
router.put("/api/movies/:id",authorization, moviesRouter.updateMovie);
router.delete("/api/movies/:id",authorization, moviesRouter.deleteMovie);

//Users Router
router.get('/api/users/', usersRouter.getUsers);
router.get('/api/users/:id', usersRouter.getUserById);
router.delete('/api/users/:id', usersRouter.deleteUser);
router.put('/api/users/:id', usersRouter.updateUser);

module.exports = router;
