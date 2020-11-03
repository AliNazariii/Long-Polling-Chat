const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

const users = new Map();
let subscribers = new Map();

app.post("/join", (req, res) => {
  console.log("/join");
  try {
    console.log(`New User ${req.body.name}`);
    const userId = 1001 + users.size;
    users.set(userId, req.body.name);
    res
      .status(200)
      .set("id", userId)
      .set("Access-Control-Expose-Headers", "id")
      .send({ ok: true });
  } catch (err) {
    console.log(`Error ${err}`);
    res.status(500).send({ error: err.message });
  }
});

app.get("/subscribe", (req, res, next) => {
  console.log("/subscribe");
  try {
    if (users.has(Number(req.headers.id))) {
      console.log(`New Subscriber ${req.headers.id}`);
      subscribers.set(Number(req.headers.id), res);
    } else {
      res.status(401).send();
    }
  } catch (err) {
    console.log(`Error ${err}`);
    res.status(500).send({ error: err.message });
  }
});

app.post("/send", (req, res) => {
  console.log("/send");
  try {
    if (users.has(Number(req.headers.id))) {
      console.log(
        `Message Received sender: ${req.headers.id} content: ${req.body.message}`
      );
      const subs = new Map(subscribers);
      subs.forEach((subscriber, userId) => {
        if (userId !== Number(req.headers.id)) {
          subscribers.delete(userId);
          subscriber.status(200).send({
            id: req.headers.id,
            name: users.get(Number(req.headers.id)),
            content: req.body.message,
          });
        }
      });
      res.status(200).send({ ok: true });
    } else {
      res.status(401).send();
    }
  } catch (err) {
    console.log(`Error ${err}`);
    res.status(500).send({ error: err.message });
  }
});

module.exports = app;
