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

/*CORS isn’t enabled on the server, this is due to security reasons by default,
so no one else but the webserver itself can make requests to the server.*/
// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  res.setHeader("Content-type", "application/json");

  // Pass to next layer of middleware
  next();
});

app.get("/hae", (req, res) => {
  const contents = fs.readFileSync("./sanakirja.txt", "utf-8");

  const rows = contents.split("\n");

  const jsonObjects = {
    translations: rows.map(row => {
      const [word, translation] = row.split(" ");
      return {
        word: word.trim(),
        translation: translation.trim()
      };
    })
  };

  res.json(jsonObjects);
});

app.get("/hae/:sana", (req, res) => {
  const searchWord = req.params.sana;
  const contents = fs.readFileSync("./sanakirja.txt", "utf-8");

  const lines = contents.split("\n");
  const jsonObject = {};

  for (let row of lines) {
    const [word, translation] = row.split(" ");
    if (word == searchWord) {
      jsonObject.word = word;
      jsonObject.translation = translation;
      res.json(jsonObject);
    }
  }

  res.status(404).send("Sanaa ei löydy");
});

app.post("/lisaa", (req, res) => {
  const { word, translation } = req.body;
  fs.appendFileSync("./sanakirja.txt", `\n${word} ${translation}`);
  res.status(200).send();  
});

module.exports = app;
