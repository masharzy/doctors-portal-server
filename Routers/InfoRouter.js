const express = require("express");
const infoRouter = express.Router();
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

infoRouter.use(cors());
infoRouter.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ygfqe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    await client.connect();

    const infoCollection = client.db("doctors-portal").collection("info");

    infoRouter.get("/infos", async (req, res) => {
      const infos = await infoCollection.find({}).toArray();
      res.send(infos);
    });

    infoRouter.post("/info", async (req, res) => {
      const info = req.body;
      const result = await infoCollection.insertOne(info);
      res.send(result);
    });

    console.log("Connected successfully to DB");
  } finally {
  }
};
run().catch(console.dir);
infoRouter.get("/", (req, res) => {
  res.send("404 Not Found");
});

module.exports = infoRouter;
