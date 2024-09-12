const mysql = require("mysql");

const fs = require("fs");
const express = require("express");
const { readFileSync } = require("fs");

var app = express();
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(3001, () => console.log("Serveri valmiina"));
const conn = mysql.createConnection({
  host: "localhost",
  user: "kt",
  password: "kt123456",
  database: "puhelinluettelo",
  multipleStatements: true,
});
conn.connect((err) => {
  if (err) {
    console.log("Tapahtui virhe yhdistettäessä tietokantaan");
    return;
  }
  console.log("Yhteys muodostettu");
});

app.get("/hae", (req, res) => {
  const contents = fs.readFileSync("./sanakirja.txt", "utf-8");

  const lines = contents.split("\n");
  const jsonObject = {};

  for (let row of lines) {
    const [word, translation] = row.split(" ");
    jsonObject[word] = translation;
  }

  res.json(jsonObject);
});

app.get("/hae/:sana", (req, res) => {
  const searchWord = req.params.sana;
  const contents = fs.readFileSync("./sanakirja.txt", "utf-8");

  const lines = contents.split("\n");
  const jsonObject = {};

  for (let row of lines) {
    const [word, translation] = row.split(" ");
    if (word == searchWord) {
      jsonObject[word] = translation;
      res.json(jsonObject);
    }
  }

  res.status(404).send("Sanaa ei löydy");
});

app.post("/lisaa", (req, res) => {
  let body = req.body;
  let line = Object.entries(body)[0];
  fs.appendFileSync("./sanakirja.txt", "\n" + `${line[0]} ${line[1]}`);
  res.status(200).send();
});

module.exports = app;
