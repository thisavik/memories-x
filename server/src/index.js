const express = require("express");
const cors = require("cors");

const connectLocalDB = require("./db/dbLocal.js").connectDB;
const connectAtlasDB = require("./db/dbAtlas.js").connectDB;
const postRoutes = require("./routes/posts.js");

// env config
require("dotenv").config();
const app = express();

// configure for properly send our req
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// localhost:8626/posts
app.use("/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("Hello to Memories API");
});
// db setup
connectAtlasDB();

app.get("/", (req, res) => res.send(`<h1>Hello</h1>`));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running at port ${port}`));
