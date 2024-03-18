const express = require("express");
const app = express();

const template = require("./template");

app.use("/template", template);

module.exports = app;
