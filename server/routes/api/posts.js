const express = require("express");
const mongodb = require("mongodb");
const MongoClient = require("mongodb").MongoClient;

const router = express.Router();

const CONNECTION_URL =
  "mongodb+srv://geniusjonathan:geniusjonathan@vueexpress-mn9ld.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "vue_express";

// Create Posts
router.post("/", (req, res) => {
  const client = new MongoClient(CONNECTION_URL, { useNewUrlParser: true });

  client.connect((err, client) => {
    if (err) {
      console.log("Error occurred while connecting to MongoDB Atlas...\n", err);
    }
    const posts = client.db(DATABASE_NAME).collection("posts");

    posts.insertOne({
      text: req.body.text,
      createdAt: new Date()
    });
  });
  client.close();
  res.status(201).send();
});

// Get Posts
router.get("/", (req, res) => {
  const client = new MongoClient(CONNECTION_URL, { useNewUrlParser: true });

  client.connect((err, client) => {
    if (err) {
      console.log("Error occurred while connecting to MongoDB Atlas...\n", err);
    }
    const collection = client.db(DATABASE_NAME).collection("posts");

    collection.find({}).toArray(function(err, result) {
      if (err) {
        res.send(err);
      } else if (result.length) {
        res.send(result);
      } else {
        res.send("No Documents Found");
      }
    });
    client.close();
  });
});

// Delete Posts
router.delete("/:id", (req, res) => {
  const client = new MongoClient(CONNECTION_URL, { useNewUrlParser: true });

  client.connect((err, client) => {
    if (err) {
      console.log("Error occurred while connecting to MongoDB Atlas...\n", err);
    }
    const posts = client.db(DATABASE_NAME).collection("posts");

    posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  });
  client.close();
  res.status(200).send();
});

// Edit Posts
router.put("/:id", (req, res) => {
  const client = new MongoClient(CONNECTION_URL, { useNewUrlParser: true });

  client.connect((err, client) => {
    if (err) {
      console.log("Error occurred while connecting to MongoDB Atlas...\n", err);
    }
    const posts = client.db(DATABASE_NAME).collection("posts");

    posts.updateOne(
      { _id: new mongodb.ObjectID(req.params.id) },
      { $set: { text: req.body.text } }
    );
  });
  client.close();
  res.status(200).send();
});

module.exports = router;
