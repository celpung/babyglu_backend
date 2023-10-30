var express = require('express');
var router = express.Router();
var multer = require('multer');

const models = require('../../models');

/* GET home page. */
router.get('/', async function (req, res) {
  models.Nakes.findByPk(req.auth.data.id, {
    include: ['user', 'puskesmas'],
  }).then((result) => {
    res.json({
      data: result,
    });
  });
});

router.get('/delete/:id', function (req, res) {
  models.Nakes.destroy({ where: { id: req.auth.data.id } }).then((result) => {
    res.json({
      msg: 'Data berhasil di hapus!',
    });
  });
});

// update profil photo
router.post('/change-photos', async function (req, res) {
  const date = new Date().toISOString();
  const newDate = date.replace(/[^0-9]/g, '');
  const phone = req.auth.data.user.phone.replace(/[^0-9]/g, '');
  const imageName = phone + newDate + '.jpg';

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/users');
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

    models.User.update(
      {
        photos: imageName,
      },
      { where: { id: req.auth.data.user.id } },
    ).then((result) => {
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
  models.User.update(
    {
      name: req.body.name,
      phone: req.body.phone,
      birthDay: req.body.birthDay,
      district: req.body.district,
      address: req.body.address,
      puskesmas_name: req.auth.data.puskesmas.name,
      puskesmas_address: req.auth.data.puskesmas.address,
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

router.post('/delete_photos', async function (req, res) {
  models.User.update(
    {
      photos: req.body.photos,
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
