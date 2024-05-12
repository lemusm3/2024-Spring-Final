require("dotenv").config();
const express = require("express");
const path = require("path");
const users = require("./controllers/users");
const products = require("./controllers/product");


/**
 * @typedef {import('../client/src/models/transportTypes').DataEnvelope<null> } ErrorDataEnvelope
 * */

const app = express();
const PORT = process.env.PORT ?? 3000;

// Static files
app.use(express.static("client/dist"));

app.use(express.json()).use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");

  next();
});

app
  .get("/", (req, res) => {
    res.send("Hello Client!");
  })
  .use("/api/v1/users", users)
  .use("/api/v1/product", products)

// 404
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  /** @type {ErrorDataEnvelope } */
  const results = {
    isSuccess: false,
    message: err.message || "Internal Server Error",
    data: null,
  };
  res.status(500).send(results);
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});