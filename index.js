const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const infoRouter = require("./Routers/InfoRouter");
const serviceRouter = require("./Routers/serviceRouter");
const testimonialRouter = require("./Routers/testimonialRouter");
const treatmentRouter = require("./Routers/treatmentRouter");

app.use(cors());
app.use(express.json());

app.use('/apis', infoRouter)
app.use('/apis', serviceRouter)
app.use('/apis', testimonialRouter)
app.use('/apis', treatmentRouter)

app.get("/", (req, res) => {
  res.send("This is a Home Page");
});

app.listen(port, () => {
  console.log("Server is running on port: ", port);
});
