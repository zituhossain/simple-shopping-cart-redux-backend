const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const products = require("./products");
const register = require("./routes/register");
const login = require("./routes/login");

const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cors());

// register & login middleware
app.use("/api/register", register);
app.use("/api/login", login);

app.get("/", (req, res) => {
  res.send("Welcome to our online shop API...");
});

app.get("/products", (req, res) => {
  res.send(products);
});

const port = process.env.PORT || 3000;
const uri = process.env.DB_URI;

// database connection
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connection successfully"))
  .catch((err) => console.log("Database Connection Failed!", err.message));

app.listen(port, console.log(`Server running on ${port}`));
