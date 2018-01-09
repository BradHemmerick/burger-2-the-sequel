const db = require("../models");

module.exports = function(app) {
    app.get("/api/burgers", function(req, res) {
        db.Todo.findAll({}).then(function(dbBurger) {
          res.json(dbBurger);
        });
      });

      app.post("/api/burgers", function(req, res) {
        db.Burger.create({
          name: req.body.name
        }).then(function(dbBurger) {
          res.json(dbBurger);
        });
      });

      app.put("/api/burgers", function(req, res) {
        db.Burger.update({
          name: req.body.name,
          devoured: req.body.devoured
        }, {
          where: {
            id: req.body.id
          }
        })
        .then(function(dbBurger) {
          res.json(dbBurger);
        });
      });
};