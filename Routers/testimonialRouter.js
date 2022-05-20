const express = require("express");
const testimonialRouter = express.Router();
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

testimonialRouter.use(cors());
testimonialRouter.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ygfqe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    await client.connect();

    const infoCollection = client.db("doctors-portal").collection("testimonial");

    testimonialRouter.get("/testimonials", async (req, res) => {
      const infos = await infoCollection.find({}).toArray();
      res.send(infos);
    });

    testimonialRouter.post("/testimonial", async (req, res) => {
      const info = req.body;
      const result = await infoCollection.insertOne(info);
      res.send(result);
    });

    console.log("Connected successfully to DB");
  } finally {
  }
};
run().catch(console.dir);
testimonialRouter.get("/", (req, res) => {
  res.send("404 Not Found");
});

module.exports = testimonialRouter;
