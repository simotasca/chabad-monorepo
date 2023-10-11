const express = require("express");
const { readFileSync } = require("fs");

const app = express();

app.use(express.static('public'));

app.get("/", (req, res) => {
  res.send(readFileSync("./editor.html").toString());
});

app.listen(3000, () => {
  console.log("listening: http://localhost:3000");
});