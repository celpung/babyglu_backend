var express = require('express');
var router = express.Router();

const models = require("../../models");

/**
 * get all vaccine
 */
router.get('/', async function (req, res) {
  await models.Vaccine.findAll({}).then(result => {
    res.status(200).json({
      data: result
    })
  });
});

module.exports = router;