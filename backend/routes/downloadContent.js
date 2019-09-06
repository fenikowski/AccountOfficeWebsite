module.exports = function(router, db, gfs) {
  router.get("/allImages", (req, res) => {
    gfs.files.find().toArray((err, files) => {
      res.json(files);
    });
  });

  router.get("/showImage/:filename", (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      const readstream = gfs.createReadStream(file);
      readstream.pipe(res);
    });
  });

  router.get("/downloadImage/:name", (req, res) => {
    const info = db.collection("info");
    info.findOne({ name: req.params.name }, (err, data) => {
      if (data) {
        res.redirect(data.link);
      }
    });
  });

  router.get("/downloadContent", (req, res) => {
    const info = db.collection("info");
    info.findOne({ name: "description" }, (err, data) => {
      res.json(data);
    });
  });

  router.get("/loadCurrentContent", (req, res) => {
    const info = db.collection("info");

    info.find({}).toArray((err, data) => {
      res.json(data);
      res.end();
    });
  });
};
