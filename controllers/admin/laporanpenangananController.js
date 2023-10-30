var express = require('express');
var router = express.Router();

const models = require('../../models');

/**
 * get report
 */
router.get('/', function (req, res) {
  models.LaporanPenanganan.findAll({
    include: [{ model: models.ImageLaporanPenanganan, as: 'image_penanganan' }],
  }).then((result) => {
    res.json({
      data: result,
    });
  });
});

module.exports = router;
