const express = require("express");
const router = express.Router();

// 2. json
// most modern api send and receive in json format
router.get("/", (req, res) => [
  res.json([
    { id: 1, name: "Laptop", price: 1299 },
    { id: 2, name: "Mouse", price: 50 },
  ]),
]);

// 3. route parameters
router.get("/:id", (req, res) => {
  //extract info from request
  const id = Number(req.params.id);

  // hard coded data in real project get data from database
  // and also error handling for bad request
  const products = [
    { id: 1, name: "Laptop", price: 1299 },
    { id: 2, name: "Mouse", price: 50 },
  ];

  const requestedProduct = products.find((product) => product.id === id);
  res.json(requestedProduct);
});

router.post("/", (req, res) => {
  const { name, price } = req.body;
  const newProduct = {
    name,
    price,
  };
  console.log(newProduct);
  res.json({ message: "New Product added", product: newProduct });
});

module.exports = router;
