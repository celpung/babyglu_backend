var express = require('express');
var router = express.Router();

const models = require('../../models');
var multer = require('multer');

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

/**
 * create laporan
 */
router.post('/create', async function (req, res) {
  UTCTime = new Date(req.body.start_time);
  let date = UTCTime.toISOString().split('T')[0];
  let time1 = req.body.start_time.substring(11);
  let myTime = time1.substring(0, 8);
  let dateVal = `${date} ${myTime}`;
  models.LaporanPosyandu.create({
    start_time: dateVal,
    finish_time: dateVal,
    name_activity: req.body.name_activity,
    participant: req.body.participant,
    ket: req.body.ket,
  }).then((result) => {
    res.json({
      status: true,
      data: result,
    });
  });
});

/**
 * delete report
 */

router.get('/delete/:id', function (req, res) {
  models.ImageLaporanPosyandu.destroy({ where: { laporan_posyandu_id: req.params.id } })
    .then(async () => {
      await models.LaporanPosyandu.destroy({ where: { id: req.params.id } });
    })
    .then((result) => {
      res.json({
        msg: 'Data berhasil di hapus!',
      });
    });
});

/**
 * update
 */
router.post('/upload/:id', async function (req, res) {
  const date = new Date().toISOString();
  const newDate = date.replace(/[^0-9]/g, '');
  const phone = req.auth.data.user.phone.replace(/[^0-9]/g, '');
  const imageName = phone + newDate + '.jpg';

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/report/nakes/posyandu');
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

    // models.ImageLaporanPosyandu.destroy({
    //   laporan_posyandu_id: req.params.id,
    //   uri: `${imageName}`,
    // });

    models.ImageLaporanPosyandu.create({
      laporan_posyandu_id: req.params.id,
      uri: `${imageName}`,
    });
    res.json({
      img: imageName,
    });
  });
});

/**
 *  update laporanposyandu
 */

router.post('/update', async function (req, res) {
  models.LaporanPosyandu.update(
    {
      name_activity: req.body.name_activity,
      start_time: req.body.start_time,
      total_anak: req.body.total_anak,
      participant: req.body.participant,
      ket: req.body.ket,
    },
    { where: { id: req.body.id } },
  ).then((result) => {
    res.json({
      status: true,
      msg: 'success',
      data: result,
    });
  });
});

module.exports = router;
