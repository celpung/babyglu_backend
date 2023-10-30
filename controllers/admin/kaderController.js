var express = require("express");
var router = express.Router();
var multer = require("multer");

const models = require("../../models");

/* GET home page. */
router.get("/", async function (req, res) {
  models.Kader.findAll({
    include: ["user", "posyandu"],
  }).then((result) => {
    res.json({
      data: result,
    });
  });
});

router.get("/filter_status", async function (req, res) {
  models.Kader.findAll({
    include: ["user", "posyandu"],
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

router.post("/register", async function (req, res) {
  const { email, name, password, confPassword } = req.body;
  let emailAdmin = await models.Admin.findOne({
    where: {
      email: email,
    },
  });
  if (emailAdmin) {
    return res.status(404).json({
      status: false,
      message: "email sudah digunakan",
    });
  }
  if (password !== confPassword)
    return res
      .status(400)
      .json({ message: "Password dan Confirm Password tidak cocok" });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await models.Admin.create({
      email: email,
      password: hashPassword,
      name: name,
    }).then((ress) => {
      return res.status(200).json({
        status: true,
        data: ress,
        message: "Register Berhasil",
      });
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/create_user", async function (req, res) {
  models.User.create({
    name: req.body.name,
    nik: req.body.nik,
    phone: req.body.phone,
    address: req.body.address,
    level: "kader",
    status: "active",
  }).then((result) => {
    res.json({
      status: true,
      data: result,
    });
  });
});

router.post("/create_kader", async function (req, res) {
  models.Kader.create({
    peran: req.body.peran,
    user_id: req.body.user_id,
    posyandu_id: req.body.posyandu_id,
  }).then((result) => {
    res.json({
      status: true,
      data: result,
    });
  });
});

router.get("/:id", async function (req, res) {
  models.Kader.findOne({
    include: ["user", "posyandu"],
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
 * update phone
 */
router.post("/update/:id", async function (req, res) {
  models.User.update(
    {
      name: req.body.name,
      nik: req.body.nik,
      phone: req.body.phone,
      address: req.body.address,
      // status: req.body.status,
      // posyandu: req.auth.data.posyandu.name,
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

//create children
router.post("/create", async function (req, res, next) {
  // const schema = {
  //   name: "string",
  //   sex: "string",
  //   born_place: "string",
  //   birth_date: "date",
  //   user_id: "number"
  // };

  // const validate = v.validate(req.body, schema);
  // if (validate.length) {
  //   res.json({
  //     status: "error",
  //     error: validate,
  //     message: validate
  //   });
  // }

  await models.Children.create({
    name: req.body.name,
    sex: req.body.sex,
    born_place: req.body.born_place,
    birth_date: req.body.birth_date,
    user_id: req.body.user_id,
  })
    .then((result) => {
      res.status(200).json({
        data: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
