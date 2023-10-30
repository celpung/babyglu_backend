var express = require('express');
var router = express.Router();

const models = require('../../models');
var jwt = require('jsonwebtoken');
var multer = require('multer');

/**
 * fetch own data
 */
router.get('/me', async function (req, res) {
  if (req.auth) {
    await models.User.findByPk(req.auth.data.id).then(result => {
      const data = result;
      res.status(200).json({
        data: data,
        token: jwt.sign({ data }, process.env.TOKEN_KEY),
      });
    });
  }

});

/**
 * fill incompleted profile
 */
router.post('/fill-profile', async function (req, res) {
  await models.User.update({
    name: req.body.name,
    nik: req.body.nik,
    city: req.body.city,
    province: req.body.province,
    district: req.body.district,
    village: req.body.village,
    address: req.body.address,
    postal_code: req.body.postal_code,
    motherName: req.body.mother_name,
    birthDay: req.body.birthDay,
    status: 'active',
  }, { where: { phone: req.body.phone } }).then((result) => {
    const data = models.User.findOne({
      where: { phone: req.body.phone }
    }).then(result => {
      const data = result;
      res.status(200).json({
        status: 'success',
        token: jwt.sign({ data }, process.env.TOKEN_KEY),
      });
    })
  });
});

/**
 * updating user data
 */
router.post('/update', async function (req, res) {
  await models.User.update({
    name: req.body.name,
    //nik: req.body.nik,
    city: req.body.city,
    province: req.body.province,
    district: req.body.district,
    village: req.body.village,
    address: req.body.address,
    birthDay: req.body.birthDay,
    postal_code: req.body.postal_code,
    //motherName: req.body.mother_name,
    job: req.body.job,
    income: req.body.income,
  }, { where: { id: req.auth.data.id } }).then(async () => {
    await models.User.findByPk(req.auth.data.id).then(result => {
      const data = result;
      console.log(data)
      res.status(200).json({
        data: data,
        token: jwt.sign({ data }, process.env.TOKEN_KEY),
      });
    });
  });
});

/**
 * update profil photo
 */
router.post('/change-photos', async function (req, res) {
  const date = new Date().toISOString();
  const newDate = date.replace(/[^0-9]/g, "");
  const phone = req.auth.data.phone.replace(/[^0-9]/g, "");
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

    let user = await models.User.findByPk(req.auth.data.id);
    user.update({
      photos: imageName,
    }).then((result) => {
      res.json({
        status: "success",
        user: result,
      });
    });
  });
});

module.exports = router;