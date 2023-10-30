var express = require('express');
var router = express.Router();

//controller
const userController = require('../controllers/users/userController');
const childrenController = require('../controllers/users/childrenController');
const vaccineController = require('../controllers//users/vaccineController');
const checkupController = require('../controllers/users/checkupController');
const articleController = require('../controllers/users/articleController');
const scheduleController = require('../controllers/users/scheduleController');

router.use('/', userController);
router.use('/children', childrenController);
router.use('/vaccine', vaccineController);
router.use('/checkup', checkupController);
router.use('/article', articleController);
router.use('/schedule', scheduleController);

module.exports = router;
