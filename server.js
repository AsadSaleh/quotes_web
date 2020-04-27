const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

const dbUsername = "AsadSaleh";
const dbPassword = "kucin99irang";
const mongodbUrl = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0-6ltnv.mongodb.net/test?retryWrites=true&w=majority`;

const app = express();

MongoClient.connect(mongodbUrl, { useUnifiedTopology: true })
  .then((client) => {
    const db = client.db("quotes-app");
    const quotesCollection = db.collection("quotes");

    app.set("view engine", "ejs");
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static("public"));
    app.use(bodyParser.json());

    app.get("/", (req, res) => {
      db.collection("quotes")
        .find()
        .toArray()
        .then((results) => {
          res.render("index.ejs", { quotes: results });
        });
    });

    // Submit OK
    app.post("/quotes", (req, res) => {
      quotesCollection
        .insertOne(req.body)
        .then(() => {
          res.redirect("/");
        })
        .catch(console.error);
    });

    // Replace
    app.put("/quotes", (req, res) => {
      quotesCollection
        .findOneAndUpdate(
          { name: "Yoda" },
          {
            $set: {
              name: req.body.name,
              quote: req.body.quote,
            },
          },
          { upsert: true }
        )
        .then((result) => {
          res.json("Success");
        })
        .catch(console.error);
    });

    // Delete
    app.delete("/quotes", async (req, res) => {
      try {
        const result = await quotesCollection.deleteOne({
          name: req.body.name,
        });
        console.log("result:", result);
        if (result.deletedCount === 0) {
          res.json("No quote to delete");
        }
        res.json("Deleted Darth Father's quote");
      } catch (error) {
        console.error(error);
      } finally {
      }
    });

    app.listen(3000, () => console.log("listening on port 3000"));
  })
  .catch((error) => console.error(error));
