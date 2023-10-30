var express = require('express');
var router = express.Router();
const models = require('../../models');
const Validator = require("fastest-validator");
const v = new Validator();

router.post('/', async function (req, res) {
  /**
   * create new children if the children id doesn't exist in request.
   */
  var childrenId;
  if (req.body.checkup.dataChild.id) {
    childrenId = req.body.checkup.dataChild.id
  } else {
    await models.Children.create({
      name: req.body.checkup.dataChild.name,
      sex: req.body.checkup.dataChild.sex,
      born_place: req.body.checkup.dataChild.bornPlace,
      birth_date: req.body.checkup.dataChild.birthDate,
      user_id: req.body.checkup.dataChild.motherId,
    }).then(result => {
      childrenId = result.id;
    });
  }

  /**
   * set for children status
   */
  var childrenAge;
  var childrenSex;
  var tall_min;
  var tall_max;
  var childrenStatus;
  // find children age
  await models.Children.findByPk(childrenId).then(result => {
    //console.log(result)
    var today = new Date();
    var birthDate = new Date(result.birth_date);
    var m = today.getMonth() - birthDate.getMonth();
    childrenAge = parseInt(m);
    childrenSex = result.sex;
  });
  // get min standard of tall
  await models.TallStandard.findOne({
    where: { age: childrenAge }
  }).then(result => {
    if (childrenSex === "Laki-Laki") {
      tall_min = result.male_min;
      tall_max = result.male_max;
    } else if (childrenSex === "Perempuan") {
      tall_min = result.female_min;
      tall_max = result.female_max;
    }
  });
  // set the status
  if (req.body.checkup.tall <= (tall_min - 3)) {
    childrenStatus = "stunting";
  } else if (req.body.checkup.tall <= tall_min && req.body.tall > (tall_min - 3)) {
    childrenStatus = "stunting";
  } else if (req.body.checkup.tall >= tall_min) {
    childrenStatus = "normal";
  }
  /**
   * create vaccination
   */
  var vacinationId;
  if (req.body.vacId > 0) {
    await models.Vaccination.create({
      children_id: childrenId,
      vaccine_id: req.body.vacId,
      dose: 30,
    }).then(result => {
      vacinationId = result.id
    });
  } else {
    vacinationId = null;
  }

  /**
   * create checkup
   */
  const checkup = async () => {
    await models.Checkup.create({
      tall: req.body.checkup.tall,
      weight: req.body.checkup.weight,
      headCircumference: req.body.checkup.headCircumference,
      armCircumference: req.body.checkup.armCircumference,
      posyandu_id: req.auth.data.posyandu.id,
      children_id: childrenId,
      kader_id: req.auth.data.id,
      vaccination_id: vacinationId,
      status: childrenStatus,
      note: req.body.note
    }).then(async () => {
      await models.Children.update({
        status: childrenStatus
      }, { where: { id: childrenId } });
    }).then((result) => {
      console.log(result)
      res.status(200).json({
        msg: 'Pemeriksaan selesai!'
      })
    });
  }

  return checkup();
});

router.get('/detail/:id', async function (req, res) {
  models.Checkup.findByPk(req.params.id, {
    include: ['posyandu', 'children',
      { model: models.Kader, as: "kader", include: ['user'] },
      { model: models.Vaccination, as: 'vaccination', include: ['vaccine'] }]
  }).then(result => {
    res.status(200).json({
      data: result
    });
  });
});

module.exports = router;