var express = require('express');
var router = express.Router();

const models = require("../../models");
var multer = require('multer');

/**
 * get report
 */
router.get('/', function (req, res) {
  models.PosyanduReport.findAll().then(result => {
    res.json({
      data: result
    });
  });
});

/**
 * update profil photo
 */
router.post('/upload', async function (req, res) {
  const date = new Date().toISOString();
  const newDate = date.replace(/[^0-9]/g, "");
  const phone = req.auth.data.user.phone.replace(/[^0-9]/g, "");
  const imageName = phone + newDate + ".jpg"

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/images/report/kader");
    },
    filename: function (req, file, cb) {
      cb(null, imageName);
    }
  });

  const upload = multer({ storage: storage }).single("image");

  upload(req, res, async function (err) {
    if (err) {
      return res.json({
        status: "error",
        message: err.message,
      });
    }
    res.json({
      image: imageName
    });
  });
});

/**
 * create report
 */
router.post('/create', async function (req, res) {
  UTCTime = new Date(req.body.time)
  let date = UTCTime.toISOString().split('T')[0]
  let time1 = req.body.time.substring(11);
  let myTime = time1.substring(0, 8);
  let dateVal = `${date} ${myTime}`;
  models.PosyanduReport.create({
    time: dateVal,
    detail: req.body.detail,
    image: req.body.image,
    posyandu_id: req.auth.data.posyandu.id,
  }).then(result => {
    res.json({
      status: true,
      data: result
    });
  });
});

/**
 * delete report
 */
router.get('/delete/:id', function (req, res) {
  models.PosyanduReport.destroy({ where: { id: req.params.id } }).then(result => {
    res.json({
      msg: 'Data berhasil di hapus!'
    });
  });

});

module.exports = router;