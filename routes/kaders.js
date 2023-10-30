var express = require('express');
var router = express.Router();

//controller
const kaderController = require('../controllers/kaders/kaderController');
const childrenController = require('../controllers/kaders/childrenController');
const vaccineController = require('../controllers//kaders/vaccineController');
const checkupController = require('../controllers/kaders/checkupController');
const masterController = require('../controllers/kaders/masterController');
const vaccinationController = require('../controllers/kaders/vaccinationController');
const scanController = require('../controllers/kaders/scanController');
const scheduleController = require('../controllers/kaders/scheduleController');
const reportController = require('../controllers/kaders/reportController');

router.use('/me', kaderController);
router.use('/children', childrenController);
router.use('/master', masterController);
router.use('/vaccine', vaccineController);
router.use('/checkup', checkupController);
router.use('/vaccination', vaccinationController);
router.use('/scan', scanController);
router.use('/schedule', scheduleController);
router.use('/report', reportController);

module.exports = router;
