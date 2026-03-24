const cors = require("cors");
const express = require("express");
const productsRouter = require("./products"); // import product router

const app = express();

// every domain list here will be allowed to talk to backend
// during development, this is fine but once your web app deployed need to update to its domain
app.use(
  cors({
    origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
  }),
);

// middleware: all app.use are middleware
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next(); // crucial otherwise request will get stuck without reaching routes
});

// enable json body parsing otherwise request.body will be undefined
// note: express execute things from top to bottom, e.g if json body parsing after post, req.body will be undefined
app.use(express.json());

// mount the router
// whenever request comes which starts with products express will forward to productsRouter
app.use("/products", productsRouter);

// 1. get routes
app.get("/", (req, res) => {
  res.send("Hello from Express");
});

app.get("/about", (req, res) => {
  res.send("this is about page");
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
