const express = require("express");

let data = [
  { id: 1, firstName: "Matti", lastName: "Ruohonen" },
  { id: 2, firstName: "Teppo", lastName: "Ruohonen" },
];
/*kts. https://devdocs.io/express/*/

const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // GET all users
app.get("/users", (req, res) => {
  res.json(data);
});

// GET a user
app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = data.find((user) => user.id === id);
  res.json(user ? user : { message: "Not found" });
});

// ADD a user
app.post("/users", (req, res) => {
  const user = req.body;
  data.push(user);
  res.json(data);
});

// UPDATE a user
app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const updatedUser = req.body;
  data = data.map((user) => (user.id === id ? updatedUser : user));
  res.json(data);
}); // DELETE a user
app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  data = data.filter((user) => user.id !== id);
  res.json(data);
});
app.listen(3000, () => {
  console.log("Server listening at port 3000");
});
