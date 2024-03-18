require("dotenv").config();

const express = require("express");
const app = express();
const PORT = 4000;
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./src/routes");

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/", routes);

app.use("*", (req, res) => {
  res.send("bad request");
});

app.listen(PORT, () => {
  console.log("listening on port ", PORT);
});
