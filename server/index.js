const express = require("express");
const app = express();
const cors = require("cors");
const mongo = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT ? process.env.PORT : 3000;

app.use(cors());
app.use(express.json());

let productsCollection = null;
let ordersCollection = null;

(async () => {
  const url = process.env.URL;
  const connection = await mongo.connect(url);
  const db = connection.db("shavitStore");
  productsCollection = db.collection("products");
  ordersCollection = db.collection("orders");
})();

app.post("/upload", (req, res) => {
  req.pipe(fs.createWriteStream(`images/${req.query.filename}`));
  res.send("WOW!");
});

app.get("/products", async (req, res) => {
  try {
    res.send(await productsCollection.find({}).toArray());
  } catch (e) {
    res.send(e);
  }
});

app.get("/orders", async (req, res) => {
  try {
    res.send(await ordersCollection.find({}).toArray());
  } catch (e) {
    res.send(e);
  }
});

app.post("/products", async (req, res) => {
  const { _id: maxId } = await productsCollection
    .find({})
    .sort({ _id: -1 })
    .next();
  try {
    await productsCollection.insertOne({ _id: maxId + 1, ...req.body });
    res.status(200).json("OK!");
  } catch (e) {
    res.send(e);
  }
});

app.post("/orders", async (req, res) => {
  try {
    await ordersCollection.insertOne({ ...req.body });
    res.status(200).json("OK!");
  } catch (e) {
    res.send(e);
  }
});

app.listen(PORT);
