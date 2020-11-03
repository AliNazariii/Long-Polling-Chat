const express = require("express");
var cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

const PORT = 4000;

const users = new Map();
let subscribers = [];

app.post("/join", (req, res) => {
  console.log("New User: ", req.body.name);
  const userId = 1001 + users.size;
  users.set(userId, req.body.name);
  res.status(200).send({ id: userId });
});

app.get("/subscribe", (req, res) => {
  console.log("New Subscriber: ", req.headers.id);
  if (users.has(Number(req.headers.id))) {
    subscribers.push(res);
  } else {
    res.status(400).send({ message: "Invalid User!" });
  }
});

app.post("/send", (req, res) => {
  if (users.has(Number(req.headers.id))) {
    subscribers.forEach((subscriber) => {
      subscriber.status(200).send({
        name: users.get(Number(req.headers.id)),
        content: req.body.message,
      });
    });
    subscribers = [];
  } else {
    res.status(400).send({ message: "Invalid User!" });
  }
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
