var express = require("express");
var router = express.Router();
const models = require("../../models");

router.get("/", async function (req, res) {
  models.Puskesmas.findAll({}).then((result) => {
    res.json({
      data: result,
    });
  });
});

router.post("/create", async function (req, res) {
  const {
    name,
    city,
    province,
    district,
    village,
    address,
    // pic,
    phone,
    tot_posyandu,
    email,
  } = req.body;
  try {
    models.Puskesmas.create({
      name: name,
      city: city,
      district: district,
      province: province,
      village: village,
      address: address,
      // pic: pic,
      phone: phone,
      tot_posyandu: tot_posyandu,
      email: email,
    }).then((result) => {
      return res.json({
        status: true,
        data: result,
      });
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async function (req, res) {
  models.Puskesmas.findOne({
    where: {
      id: req.params.id,
    },
  }).then((result) => {
    res.json({
      data: result,
    });
  });
});

router.put("/update/:id", async function (req, res) {
  models.Puskesmas.update(
    {
      name: req.body.name,
      city: req.body.city,
      district: req.body.district,
      village: req.body.village,
      address: req.body.address,
      // pic: req.body.pic,
      phone: req.body.phone,
      tot_posyandu: req.body.tot_posyandu,
      email: req.body.email,
    },
    { where: { id: req.params.id } }
  ).then((result) => {
    res.json({
      status: true,
      msg: "success",
      data: result,
    });
  });
});

module.exports = router;
