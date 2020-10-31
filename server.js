const express = require("express");
var cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

const PORT = 4000;

let subscribers = [];

app.get("/subscribe", (req, res) => {
  console.log("New Subscriber...");
  subscribers.push(res);
});

app.post("/send", (req, res) => {
  console.log(req.query, req.body);
  subscribers.forEach((subscriber) => {
    subscriber.send({ message: req.body.message });
  });
  subscribers = [];
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
