import express from "express";
import { json } from "body-parser";
const chalk = require("chalk");
const log = console.log;
const info = chalk.blue;
const error = chalk.red;

const app = express();
app.use(json());

app.get("api/users/currentuser", (req, res) => {
  res.send("Hi there!");
});

app.listen(3001, () => {
  log(info("AUTH: Server started on port 3001 🚀"));
});
