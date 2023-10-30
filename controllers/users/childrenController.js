var express = require("express");
var router = express.Router();
const models = require("../../models");

/**
 * get user data with all relation data
 */
router.get("/", async function (req, res) {
  models.User.findByPk(req.auth.data.id, {
    include: [{ model: models.Children, as: "children", order: 'birth_date DESC', include: [{ model: models.Checkup, as: "checkup", include: ["posyandu", { model: models.Kader, as: "kader", include: ["user"] }, { model: models.Vaccination, as: "vaccination", include: ["vaccine"] }] }] }],
  }).then((result) => {
    res.json({
      data: result,
    });
  });
});

/**
 * get all vaccine data
 */
router.get('/vaccine', async function (req, res) {
  models.Vaccine.findAll().then(result => {
    res.status(200).json({
      data: result
    });
  });
});

/**
 * get all schedule
 */
router.get('/schedule/:id', async function (req, res) {
  models.Schedule.findOne({
    where: { posyandu_id: req.params.id }
  }).then(result => {
    res.status(200).json({
      data: result
    });
  });
});

module.exports = router;
