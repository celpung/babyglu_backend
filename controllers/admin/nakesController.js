var express = require("express");
var router = express.Router();
var multer = require("multer");

const models = require("../../models");

/* GET home page. */
router.get("/", async function (req, res) {
  models.Nakes.findAll({
    include: ["user", "puskesmas"],
  }).then((result) => {
    res.json({
      data: result,
    });
  });
});

router.get("/filter_status", async function (req, res) {
  models.Nakes.findAll({
    include: ["user", "puskesmas"],
  }).then((result) => {
    const aktif = result.filter((val) => val.user.status === "active");
    const in_aktif = result.filter((val) => val.user.status === "inactive");

    let aktiff = [];
    aktif.forEach((element) => {
      aktiff.push(element);
    });

    let in_aktiff = [];
    in_aktif.forEach((element) => {
      in_aktiff.push(element);
    });

    res.status(200).json({
      data: {
        aktif: aktiff,
        in_aktif: in_aktiff,
      },
    });
  });
});

router.post("/create_user", async function (req, res) {
  models.User.create({
    name: req.body.name,
    status: req.body.status,
    nik: req.body.nik,
    phone: req.body.phone,
    birthDay: req.body.birthDay,
    city: req.body.city,
    province: req.body.province,
    district: req.body.district,
    village: req.body.village,
    address: req.body.address,
    level: "nakes",
  }).then((result) => {
    res.json({
      status: true,
      data: result,
    });
  });
});

router.post("/create_nakes", async function (req, res) {
  models.Nakes.create({
    // nip: req.body.nip,
    user_id: req.body.user_id,
    puskesmas_id: req.body.puskesmas_id,
  }).then((result) => {
    res.json({
      status: true,
      data: result,
    });
  });
});

router.get("/:id", async function (req, res) {
  models.Nakes.findOne({
    include: ["user", "puskesmas"],
    where: {
      id: req.params.id,
    },
  }).then((result) => {
    res.json({
      data: result,
    });
  });
});

/**
 * update data
 */
router.post("/update/:id", async function (req, res) {
  try {
    models.User.update(
      {
        name: req.body.name,
        nik: req.body.nik,
        // nip: req.body.nip,
        // status: req.body.status,
        phone: req.body.phone,
        birthDay: req.body.birthDay,
        village: req.body.village,
        district: req.body.district,
        province: req.body.province,
        address: req.body.address,
        // puskesmas_name: req.auth.data.puskesmas.name,
      },
      { where: { id: req.params.id } }
    ).then((result) => {
      console.log(result);
      res.json({
        status: true,
        msg: "success",
        data: result,
      });
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
