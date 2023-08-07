require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./src/routes");
const errorHandler = require("./middleware/errorhandler");
const swaggerUi = require("swagger-ui-express");
const swaggerJson = require("./swagger.json");
const cors = require("cors");
const morgan = require("morgan");
const port = 3000;

app.use("/api-docs/", swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'))

app.use("/", routes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
