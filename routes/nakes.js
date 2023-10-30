var express = require('express');
var router = express.Router();

//controller
const nakesController = require('../controllers/nakes/nakesController');
const masterController = require('../controllers/nakes/masterController');
const childrenController = require('../controllers/nakes/childrenController');
const laporanposyanduController = require('../controllers/nakes/laporanposyanduController');
const laporanpenangananController = require('../controllers/nakes/laporanpenangananController');
const aksipenangananController = require('../controllers/nakes/aksipenangananController');

//const vaccineController = require("../controllers//users/vaccineController");
//const checkupController = require("../controllers/users/checkupController");

router.use('/me', nakesController);
router.use('/master', masterController);
router.use('/children', childrenController);
router.use('/laporan', laporanposyanduController);
router.use('/penanganan', laporanpenangananController);
router.use('/aksi_penanganan', aksipenangananController);
//router.use('/vaccine', vaccineController);
//router.use('/checkup', checkupController);

module.exports = router;
