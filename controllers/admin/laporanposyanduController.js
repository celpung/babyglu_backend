var express = require('express');
var router = express.Router();

const models = require('../../models');

/**
 * get laporan
 */
router.get('/', function (req, res) {
  models.LaporanPosyandu.findAll({
    include: [{ model: models.ImageLaporanPosyandu, as: 'image_posyandu' }],
  }).then((result) => {
    res.json({
      data: result,
    });
  });
});

module.exports = router;
