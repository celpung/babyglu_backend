var express = require("express");
var router = express.Router();
const models = require("../../models");
const Validator = require("fastest-validator");
const v = new Validator();

// get children in current posyandu where the kader's and all status.
router.get("/", async function (req, res) {
  await models.Children.findAll({
    include: [
      "user",
      {
        model: models.Checkup,
        as: "checkup",
        include: ["posyandu", "kader", "vaccination"],
      },
    ],
  })
    .then((result) => {
      // const data = await result.filter((item) => (item.checkup.posyandu_id = req.authAdmin.data.posyandu_id));
      res.json({
        data: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/filter_by_status", async function (req, res) {
  await models.Children.findAll({
    include: [
      "user",
      {
        model: models.Checkup,
        as: "checkup",
        // include: ['posyandu', 'kader', 'vaccination', { model: models.AksiPenanganan, as: 'aksi_penanganan' }],
      },
    ],
  }).then((result) => {
    const normal = result.filter((val) => val.status === "normal");
    const gejala = result.filter((val) => val.status === "gejala");
    const stunting = result.filter((val) => val.status === "stunting");

    let nm = [];
    normal.forEach((element) => {
      let a = element.checkup[0];
      if (element.status === a.status) {
        nm.push(element);
      } else {
        console.log(
          "maaf tidak ada status anak yang cocok dengan data status yang ada di check up"
        );
      }
    });

    let gj = [];
    gejala.forEach((element) => {
      let a = element.checkup[0];
      if (element.status === a.status) {
        gj.push(element);
      } else {
        console.log(
          "maaf tidak ada status anak yang cocok dengan data status yang ada di check up"
        );
      }
    });

    let st = [];
    stunting.forEach((element) => {
      let a = element.checkup[0];
      if (element.status === a.status) {
        st.push(element);
      } else {
        console.log(
          "maaf tidak ada status anak yang cocok dengan data status yang ada di check up"
        );
      }
    });

    res.status(200).json({
      data: {
        normal: nm,
        gejala: gj,
        stunting: st,
      },
    });
  });
});

router.get("/filter_by_sex", async function (req, res) {
  await models.Children.findAll({
    include: [
      "user",
      {
        model: models.Checkup,
        as: "checkup",
      },
    ],
  }).then((result) => {
    const boy = result.filter((val) => val.sex === "laki-laki");
    const girl = result.filter((val) => val.sex === "perempuan");

    let boys = [];
    boy.forEach((element) => {
      let a = element.checkup[0];
      if (element.status === a.status) {
        boys.push(element);
      } else {
        console.log(
          "maaf tidak ada status anak yang cocok dengan data status yang ada di check up"
        );
      }
    });
    let girls = [];
    girl.forEach((element) => {
      let a = element.checkup[0];
      if (element.status === a.status) {
        girls.push(element);
      } else {
        console.log(
          "maaf tidak ada status anak yang cocok dengan data status yang ada di check up"
        );
      }
    });

    res.status(200).json({
      data: {
        laki_laki: boys,
        perempuan: girls,
      },
    });
  });
});

// get children data by id
router.get("/:id", async function (req, res) {
  models.Children.findByPk(req.params.id, {
    include: [
      "user",
      {
        model: models.Checkup,
        as: "checkup",
        include: [
          "posyandu",
          "kader",
          {
            model: models.Vaccination,
            as: "vaccination",
            include: ["vaccine"],
          },
          { model: models.AksiPenanganan, as: "aksi_penanganan" },
        ],
      },
    ],
  }).then((result) => {
    res.status(200).json({
      data: result,
    });
  });
});

// checkup history
router.get("/history/:id", async function (req, res) {
  await models.Children.findOne({
    where: { id: req.params.id },
    include: [
      "user",
      {
        model: models.Checkup,
        as: "checkup",
        include: [
          "posyandu",
          "kader",
          {
            model: models.Vaccination,
            as: "vaccination",
            include: ["vaccine"],
          },
        ],
      },
    ],
  })
    .then((result) => {
      res.status(200).json({
        data: result,
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: err,
      });
    });
});

module.exports = router;
