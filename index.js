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
  const contents = fs.readFileSync("./sanakirja.txt");
  res.send(contents);
});

app.get("/hae/:sana", (req, res) => {
  const searchWord = req.params.sana;
  const contents = fs.readFileSync("./sanakirja.txt", "utf-8");

  const lines = contents.split("\n");

  for (let row of lines) {
    const words = row.split(" ");

    if (words[0] === searchWord) {
      if (words[1]) {
        return res.send(words[1]);
      } else {
        return res.status(404).send("Käännöstä ei löydy");
      }
    }
  }

  res.status(404).send("Sanaa ei löydy");
});

app.use(express.text());
app.post("/lisaa", (req, res) => {
  let word = req.body;
  fs.appendFileSync("./sanakirja.txt", "\n" + word);
  res.status(200).send();
});

module.exports = app;
