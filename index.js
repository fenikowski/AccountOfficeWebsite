const express = require("express");
const path = require("path");
const mongo = require("mongodb");
var ObjectId = require("mongodb").ObjectID;
var cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const nodemailer = require("nodemailer");
const nodeEmail = require("./backend/nodejs-email");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const crypto = require("crypto");

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

const router = express.Router();

const mongoURI =
  "mongodb+srv://admin:LmLGdKsWKZJ1EMpj@mycluster-05qfh.mongodb.net/test?retryWrites=true&w=majority";

const client = new mongo.MongoClient(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// append /api for our http requests
app.use("/api", router);

// Init gfs
let gfs;
let db;

// connects our back end code with the database
client.connect(err => {
  if (err) console.log("Connection failed");
  else {
    console.log("Connected to the database!");
    db = client.db("biuro");
    // init stream

    gfs = Grid(db, mongo);
    gfs.collection("uploads");

    // routes
    require("./backend/routes/urgentInfo")(router, db);
    require("./backend/routes/logging")(router, db);
    require("./backend/routes/downloadContent")(router, db, gfs);
  }
});

// Create storage engine

const storage = new GridFsStorage({
  url: "mongodb+srv://admin:LmLGdKsWKZJ1EMpj@mycluster-05qfh.mongodb.net/biuro",
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads"
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

router.post("/updateDescription", (req, res) => {
  const { description } = req.body;

  const info = db.collection("info");

  info.updateOne({ name: "description" }, { $set: { content: description } });

  res.json({ response: "Zmiana zapisana" });
  res.end();
});

router.post("/updatePhotoDescription", (req, res) => {
  const { description } = req.body;

  const info = db.collection("info");

  info.updateOne(
    { name: "photoDescription" },
    { $set: { content: description } }
  );

  res.json({ response: "Zmiana zapisana" });
  res.end();
});

router.get("/getCertificates", (req, res) => {
  const info = db.collection("info");

  info.find({ name: "certificate" }).toArray((err, data) => {
    res.json(data);
  });
});

router.delete("/deleteCertificate/:filename", (req, res) => {
  console.log(req.params);

  gfs.remove({ filename: req.params.filename, root: "uploads" });

  const info = db.collection("info");
  info.removeOne({ filename: req.params.filename }, (err, data) => {
    if (err) console.log(err);
    else console.log("success");
    res.end();
  });
});

router.post("/updatePhoto/:for", upload.single("file"), (req, res) => {
  const info = db.collection("info");

  // for certificates

  if (req.params.for === "certificate") {
    crypto.randomBytes(2, (err, buf) => {
      const filename = req.params.for + buf.toString("hex");

      info.insertOne({
        name: req.params.for,
        frontEndName: filename,
        link: `http://localhost:5000/api/showImage/${filename}`,
        filename: req.file.filename
      });
    });
    return res.redirect("http://localhost:3000/admin");
  }

  // any other case

  // check if any already exists
  info.findOne({ name: req.params.for }, (err, data) => {
    // if exists
    if (data) {
      // first delete old file
      gfs.remove({ filename: data.filename, root: "uploads" }, function(err) {
        if (err) return handleError(err);
        console.log("success");
      });
      // then updata the info about new file
      info.updateOne(
        { name: req.params.for },
        {
          $set: {
            link: `http://localhost:5000/api/showImage/${req.file.filename}`,
            filename: req.file.filename
          }
        }
      );
    } else {
      info.insertOne({
        name: req.params.for,
        link: `http://localhost:5000/api/showImage/${req.file.filename}`,
        filename: req.file.filename
      });
    }
  });

  res.redirect("http://localhost:3000/admin");
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

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
