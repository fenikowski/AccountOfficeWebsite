module.exports = function(router, db) {
  router.post("/login", (req, res) => {
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
};
