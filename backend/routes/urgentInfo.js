module.exports = function(router, db) {
  router.get("/urgentInfo", (req, res) => {
    const info = db.collection("info");

    const today = new Date();
    const day = Number(today.getDate());
    const month = Number(today.getMonth());
    const year = Number(today.getFullYear());

    info.findOne({ name: "urgentInfo" }, (err, data) => {
      console.log(data.until.year, year);
      console.log(data.until.month, month + 1);
      console.log(data.until.day, day);

      // added 1 to months to match current date

      if (data) {
        if (
          (data.until.year >= year && data.until.month > month + 1) ||
          (data.until.year >= year &&
            data.until.month === month + 1 &&
            data.until.day > day)
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

    const info = db.collection("info");

    info.updateOne(
      { name: "urgentInfo" },
      { $set: { until: { day, month, year }, content: urgentInfo } }
    );

    res.json({ response: "Zmiana zapisana" });
    res.end();
  });
};
