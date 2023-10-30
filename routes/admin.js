var express = require("express");
var router = express.Router();

//controller
const adminController = require("../controllers/admin/adminController");
const childrenController = require("../controllers/admin/childrenController");
const kaderController = require("../controllers/admin/kaderController");
const nakesController = require("../controllers/admin/nakesController");
const puskesmasController = require("../controllers/admin/puskesmasController");
const posyanduController = require("../controllers/admin/posyanduController");
const lapPenangananController = require("../controllers/admin/laporanpenangananController");
const lapPosyanduController = require("../controllers/admin/laporanposyanduController");
const vaccineController = require("../controllers/admin/vaccineController");
router.use("/me", adminController);
router.use("/children", childrenController);
router.use("/kader", kaderController);
router.use("/nakes", nakesController);
router.use("/puskesmas", puskesmasController);
router.use("/posyandu", posyanduController);
router.use("/laporan_penanganan", lapPenangananController);
router.use("/laporan_posyandu", lapPosyanduController);
// router.use('/master', masterController);
router.use("/vaccine", vaccineController);
// router.use('/checkup', checkupController);
// router.use('/vaccination', vaccinationController);
// router.use("/scan", scanController);
// router.use("/schedule", scheduleController);
// router.use("/report", reportController);

module.exports = router;
