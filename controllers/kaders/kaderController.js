var express = require('express');
var router = express.Router();
var multer = require('multer');

const models = require("../../models")

/* GET home page. */
router.get('/', async function (req, res) {
  models.Kader.findByPk(req.auth.data.id, {
    include: ['user', 'posyandu']
  }).then(result => {
    res.json({
      data: result
    })
  });
});

// update profil photo
router.post('/change-photos', async function (req, res) {
  const date = new Date().toISOString();
  const newDate = date.replace(/[^0-9]/g, "");
  const phone = req.auth.data.user.phone.replace(/[^0-9]/g, "");
  const imageName = phone + newDate + ".jpg"

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/images/users");
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

    models.User.update({
      photos: imageName
    }, { where: { id: req.auth.data.user.id } }).then(result => {
      res.json({
        image: imageName,
      });
    });
  });
});

/**
 * update phone
 */
router.post('/update', async function (req, res) {
  models.User.update({
    phone: req.body.phone,
  }, { where: { id: req.body.id } }).then(result => {
    res.json({
      status: true,
      msg: 'success',
      data: result,
    })
  });
});

module.exports = router;