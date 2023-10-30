var express = require('express');
var router = express.Router();

//controller
const authController = require('../controllers/authController');
const notificationController = require('../controllers/notificationController');
const authAdminController = require('../controllers/admin/authController');
const userRoutes = require('./users');
const kaderRoutes = require('./kaders');
const nakesRoutes = require('./nakes');
const adminRoutes = require('./admin');

const models = require('../models');

// middlewares
const kaderMiddleware = require('../middlewares/kader');
const userMiddleware = require('../middlewares/user');
const nakesMiddleware = require('../middlewares/nakes');
const adminMiddleware = require('../middlewares/admin');

router.use('/auth', authController);
router.use('/authAdmin', authAdminController);
router.use('/notification', notificationController);
router.use('/user', userMiddleware, userRoutes);
router.use('/kader', kaderMiddleware, kaderRoutes);
router.use('/nakes', nakesMiddleware, nakesRoutes);
router.use('/admin', adminMiddleware, adminRoutes);

router.post('/registrasi-kader', async function (req, res) {
  const reqPhone = req.body.phone;
  const str = req.body.phone;
  const char = str[0];
  let phones;

  if (char === '0') {
    phones = str.replace(char, '+62');
  } else {
    phones = req.body.phone;
  }

  const user = await models.User.create({
    name: req.body.name,
    nik: req.body.nik,
    province: 'Sumatera Utara',
    city: 'Medan',
    district: req.body.district,
    village: req.body.village,
    address: req.body.address,
    postal_code: req.body.postal_code,
    phone: phones,
    status: 'active',
    level: 'kader',
    birthDay: req.body.birth_day,
    motherName: '-',
  });

  const createPosyandu = await models.Posyandu.create({
    name: req.body.posyandu_name,
    district: req.body.posyandu_district,
    village: req.body.posyandu_village,
    address: req.body.posyandu_address,
  });

  const posyanduData = await models.Posyandu.findOne({
    where: { name: createPosyandu.name, district: createPosyandu.district },
  });

  const createKader = await models.Kader.create({
    user_id: user.id,
    posyandu_id: posyanduData.id,
  });

  if (createKader) {
    res.json({
      msg: 'Registrasi berhasil',
    });
  } else {
    res.json({
      msg: 'Registrasi gagal',
    });
  }
});
module.exports = router;
