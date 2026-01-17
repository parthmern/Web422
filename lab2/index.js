const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

const PORT = 3000;

let items = [
  { id: 1, name: "Red" },
  { id: 2, name: "Green" },
  { id: 3, name: "Blue" },
];

const getNextId = () =>
  items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1;

app.get("/", (req, res) => {
  const fileRoute = path.join(__dirname, "index-bootstrap.html");
  console.log("fileroute-->" + fileRoute);
  return res.sendFile(fileRoute);
});

app.get("/ping", (req, res) => {
  return res.status(200).json({
    name: "parth ranjitbhai patel",
    studentId: "128823234",
  });
});

app.get("/items", (req, res) => {
  return res.json(items);
});

app.get("/items/:id", (req, res) => {
  const item = items.find((i) => i.id === Number(req.params.id));

  // doing without try catch but that can be better way as I feel and using global error handler
  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }
  return res.json(item);
});

app.post("/items", (req, res) => {
  const newItem = {
    id: getNextId(),
    name: req.body.name,
  };

  items.push(newItem);
  return res.status(201).json(newItem);
});

app.put("/items/:id", (req, res) => {
  const item = items.find((i) => i.id === Number(req.params.id));
  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  item.name = req.body.name;
  return res.json(item);
});

app.delete("/items/:id", (req, res) => {
  items = items.filter((i) => i.id !== Number(req.params.id));
  return res.json({ message: "Item deleted" });
});

app.listen(PORT, () => {
  console.log(`server started on http://localhost:${PORT}`);
});
