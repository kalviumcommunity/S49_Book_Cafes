const express = require("express");
const router = express.Router();

// Mock data for demonstration
let data = [
  {
    id: 1,
    cafeName: "brewbooks",
    loc: "Indiranagar",
    type: "asthetic",
    ratings: 4.8,
  },
  {
    id: 2,
    cafeName: "brewbooks2",
    loc: "Indiranagar2",
    type: "asthetic2",
    ratings: 4.7,
  },
  {
    id: 3,
    cafeName: "brewbooks3",
    loc: "Indiranagar3",
    type: "asthetic3",
    ratings: 4.8,
  },
];

// CRUD operations
router.post("/create", (req, res) => {
  const newItem = req.body; // assuming the body contains the new item to be added
  newItem.id = data.length + 1;
  data.push(newItem);
  res.json(newItem);
});

router.get("/read", (req, res) => {
  res.json(data);
});

router.put("/update/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updateItem = req.body; // assuming the body contains the updated item
  const index = data.findIndex((item) => item.id === id);
  if (index !== -1) {
    data[index] = { ...data[index], ...updateItem };
    res.json(data[index]);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

router.delete("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = data.findIndex((item) => item.id === id);
  if (index !== -1) {
    const deletedItem = data.splice(index, 1);
    res.json(deletedItem);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

module.exports = router;
