var express = require('express');
var router = express.Router();

const models = require('../../models');
var multer = require('multer');

/**
 * get report
 */
router.get('/', function (req, res) {
  models.AksiPenanganan.findAll({
    include: [{ model: models.ImageAksiPenanganan, as: 'image_aksi_penanganan' }],
  }).then((result) => {
    res.json({
      data: result,
    });
  });
});

/**
 * create report
 */
router.post('/create', async function (req, res) {
  models.AksiPenanganan.create({
    checkup_id: req.body.checkup_id,
    pasokan: req.body.pasokan,
    pasokan_lainnya: req.body.pasokan_lainnya,
    sosialisasi: req.body.sosialisasi,
    sosialisasi_lainnya: req.body.sosialisasi_lainnya,
    sanitasi: req.body.sanitasi,
    penanganan_lainnya: req.body.penanganan_lainnya,
  }).then((result) => {
    res.json({
      status: true,
      data: result,
    });
  });
});

router.post('/upload/:id', async function (req, res) {
  const date = new Date().toISOString();
  const newDate = date.replace(/[^0-9]/g, '');
  const phone = req.auth.data.user.phone.replace(/[^0-9]/g, '');
  const imageName = phone + newDate + '.jpg';

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/report/nakes/aksi_penanganan');
    },
    filename: function (req, file, cb) {
      cb(null, imageName);
    },
  });

  const upload = multer({ storage: storage }).single('image');

  upload(req, res, async function (err) {
    if (err) {
      return res.json({
        status: 'error',
        message: err.message,
      });
    }

    models.ImageAksiPenanganan.create({
      aksi_penanganan_id: req.params.id,
      uri: `http://${process.env.IP_ADDRESS}:${process.env.PORT}/images/report/nakes/aksi_penanganan/${imageName}`,
    });

    res.json({
      img: imageName,
    });
  });
});

module.exports = router;
