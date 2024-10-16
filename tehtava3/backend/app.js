const mysql = require("mysql");
const express = require("express");

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(3001, () => console.log("Serveri valmiina"));
const conn = mysql.createConnection({
  host: "localhost",
  user: "kt",
  password: "kt123456",
  database: "urheilijayhdistys",
  multipleStatements: true,
});
conn.connect((err) => {
  if (err) {
    console.log("Tapahtui virhe yhdistettäessä tietokantaan");
    return;
  }
  console.log("Yhteys muodostettu");
});

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Content-type", "application/json");
  next();
});

app.get("/urheilijat", (req, res) => {
  conn.query("SELECT * FROM urheilijat", (err, rows) => {
    if (err) throw err;
    return res.status(200).json(rows);
  });
});

app.get("/urheilija", (req, res) => {
  const { etunimi, sukunimi } = req.query;

  if (!etunimi || !sukunimi) {
    return res.status(400).send("etunimi and sukunimi are required");
  }

  conn.query(
    "SELECT * FROM urheilijat WHERE etunimi=? AND sukunimi=?",
    [etunimi, sukunimi],
    (err, rows) => {
      if (err) throw err;
      res.json(rows);
    }
  );
});

// app.put("/urheilijat/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const updatedUser = req.body;
//   conn.query(
//     "UPDATE henkilot SET ? urheilijat id = ?;",
//     [updatedUser, req.params.id],
//     function (error, results) {
//       if (error) throw error;
//       conn.query("SELECT * FROM urheilijat WHERE id=?", id, (err, rows) => {
//         if (err) throw err;
//         res.end(JSON.stringify(rows[0]));
//       });
//     }
//   );
// });

app.put("/urheilijat", (req, res) => {
  const etunimi = req.query.etunimi;
  const sukunimi = req.query.sukunimi;
  const updatedData = req.body;

  conn.query(
    "UPDATE urheilijat SET ? WHERE etunimi = ? AND sukunimi = ?;",
    [updatedData, etunimi, sukunimi],
    function (error, results) {
      if (error) {
        console.error("Error updating:", error);
        return res.status(500).json({ message: "Update failed", error });
      }

      // Check if any rows were affected (i.e., if the update was successful)
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "No record found to update" });
      }

      // After successful update, fetch the updated data
      conn.query(
        "SELECT * FROM urheilijat WHERE etunimi = ? AND sukunimi = ?",
        [etunimi, sukunimi],
        (err, rows) => {
          if (err) {
            console.error("Error retrieving updated data:", err);
            return res
              .status(500)
              .json({ message: "Retrieval failed", error: err });
          }

          // Check if any rows were returned
          if (rows.length === 0) {
            return res
              .status(404)
              .json({ message: "Record not found after update" });
          }

          // Return the updated data
          res.json(rows[0]);
        }
      );
    }
  );
});

app.delete("/urheilija", (req, res) => {
  const etunimi = req.query.etunimi;
  const sukunimi = req.query.sukunimi;

  conn.query(
    "DELETE FROM urheilijat WHERE etunimi = ? AND sukunimi = ?",
    [etunimi, sukunimi],
    function (error, results) {
      if (error) {
        res.status(500).send();
        return;
      }
      res.status(200).send();
    }
  );
});

app.post("/lisaa", (req, res) => {
  let henkilo = req.body;
  if (!henkilo) {
    return res.status(400).send();
  }
  conn.query(
    "INSERT INTO urheilijat SET ? ",
    henkilo,
    function (error, results, fields) {
      if (error) throw error;
      return res.send(JSON.stringify({ id: results.insertId, ...henkilo }));
    }
  );
});

module.exports = app;
