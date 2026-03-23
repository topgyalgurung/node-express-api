const cors = require("cors");
const express = require("express");

const app = express();

// every domain list here will be allowed to talk to backend
// during development, this is fine but once your web app deployed need to update to its domain
app.use(
  cors({
    origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
  }),
);

// enable json body parsing otherwise request.body will be undefined
app.use(express.json());

// 1. get routes
app.get("/", (req, res) => {
  res.send("Hello from Express");
});

app.get("/about", (req, res) => {
  res.send("this is about page");
});

// 2. json
// most modern api send and receive in json format
app.get("/products", (req, res) => [
  res.json([
    { id: 1, name: "Laptop", price: 1299 },
    { id: 2, name: "Mouse", price: 50 },
  ]),
]);

// 3. route parameters
app.get("/products/:id", (req, res) => {
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

app.get("/message", (req, res) => {
  res.json({ message: "Hello from your express backend" });
});

// post
app.post("/message", (req, res) => {
  // object destructuring
  const { name, message } = req.body;

  // then we can store in the database
  // for now just console log
  console.log("New Message: ", name, message);
  res.json({ message: "thank you for the message" }); // then send json response back to frontend
});
app.listen(3000, () => {
  console.log("The server is running");
});
