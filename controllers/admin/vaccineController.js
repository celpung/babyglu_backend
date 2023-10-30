var express = require("express");
var router = express.Router();
const models = require("../../models");

/* GET home page. */
router.get("/", async function (req, res) {
  models.Vaccine.findAll({}).then((result) => {
    res.json({
      data: result,
    });
  });
});

router.post("/create", async function (req, res) {
  await models.Vaccine.create({
    name: req.body.name,
    type: req.body.type,
    description: req.body.description,
  })
    .then((result) => {
      res.status(200).json({
        data: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/update/:id", async function (req, res) {
  models.Vaccine.update(
    {
      name: req.body.name,
      type: req.body.type,
    },
    { where: { id: req.body.id } }
  ).then((result) => {
    res.json({
      status: true,
      msg: "success",
      data: result,
    });
  });
});

module.exports = router;
