const express = require("express");
const path = require("path");
const mongo = require("mongodb");
var ObjectId = require("mongodb").ObjectID;
var cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const nodemailer = require("nodemailer");
const nodeEmail = require("./backend/nodejs-email");

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, "client/build")));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

const router = express.Router();

const client = new mongo.MongoClient(
  "mongodb+srv://admin:LmLGdKsWKZJ1EMpj@mycluster-05qfh.mongodb.net/test?retryWrites=true",
  {
    useNewUrlParser: true
  }
);

// append /api for our http requests
app.use("/api", router);

// connects our back end code with the database
client.connect(err => {
  if (err) console.log("Connection failed");
  else console.log("Connected to the database!");
});

router.get("/urgentInfo", (req, res) => {
  const db = client.db("biuro");
  const info = db.collection("info");

  const today = new Date();
  const day = Number(today.getDate());
  const month = Number(today.getMonth());
  const year = Number(today.getFullYear());

  info.findOne({ name: "urgentInfo" }, (err, data) => {
    if (data) {
      if (
        data.until.year >= year &&
        data.until.month >= month &&
        data.until.day > day
      ) {
        res.json(data);
        res.end();
      } else {
        res.json({});
        res.end();
      }
    }
  });
});

router.post("/urgentInfo", (req, res) => {
  const { urgentInfo, year, month, day } = req.body;

  const db = client.db("biuro");
  const info = db.collection("info");

  info.updateOne(
    { name: "urgentInfo" },
    { $set: { until: { day, month, year }, content: urgentInfo } }
  );

  res.json({ response: "Zmiana zapisana" });
  res.end();
});

router.post("/sendMessage", (req, res) => {
  const { author, contact, textarea } = req.body;

  const message = `<p style='fontsize: 20px; margin-bottom: 5px;'>Otrzymałeś nową wiadomość od <b>${author}</b>.</p>
<p style='fontsize: 20px'>Treść wiadomości to:</p>
<p style='fontsize: 16px; border: solid 1px black; margin: 5px 0 10px;'>${textarea}</p>
<p style='fontsize: 20px'>Możesz na nią odpowiedzieć kontaktując się za pomocą <b>${contact}</b>.</p>`;

  nodeEmail(nodemailer, message);

  res.json({ info: "Wiadomość została wysłana!" });
  res.end();
});

router.post("/login", (req, res) => {
  const db = client.db("biuro");
  const users = db.collection("users");

  users.findOne({ user: req.body.user }, (err, data) => {
    if (err) {
      console.log("Failed to connect:" + err);
      res.json({ info: "Failed to connect database" });
      res.end();
    } else if (data) {
      if (data.password === req.body.password) {
        res.json({ info: "Zalogowano", user: "admin" });
        res.end();
      } else {
        res.json({ info: "Niewłaściwe hasło" });
        res.end();
      }
    } else {
      res.json({ info: "Użytkownik nie istnieje" });
      res.end();
    }
  });
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
