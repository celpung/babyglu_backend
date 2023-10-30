var express = require('express');
var router = express.Router();
const models = require('../../models');
const Validator = require("fastest-validator");
const v = new Validator();

// get children in current posyandu where the kader's and all status.
router.get('/', async function (req, res) {
  models.Children.findAll({
    include: ['user', {
      model: models.Checkup, as: "checkup", include: ['posyandu', 'kader', 'vaccination']
    }]
  }).then(async (result) => {
    const data = await result.filter(item => item.checkup.posyandu_id = req.auth.data.posyandu_id);
    res.status(200).json({
      data: data,
    })
  }).catch(err => {
    console.log(err);
  });
});

// get children data by id
router.get('/:id', async function(req,res) {
  models.Children.findByPk(req.params.id, {
    include: ['user', {
      model: models.Checkup, as: "checkup", include: ['posyandu', 'kader', {model: models.Vaccination, as: 'vaccination', include: ['vaccine']}]
    }]
  }).then(result => {
    res.status(200).json({
      data: result,
    });
  })
});

//create children
router.post('/create', async function (req, res, next) {
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
  }).then(result => {
    res.status(200).json({
      data: result,
    });
  }).catch(err => {
    console.log(err);
  });

  
});

// checkup history
router.get('/history/:id', async function (req, res) {
  await models.Children.findOne({
    where: { id: req.params.id },
    include: ['user', {
      model: models.Checkup, as: "checkup", include: ['posyandu', 'kader', { model: models.Vaccination, as: "vaccination", include: ['vaccine'] }]
    }]
  }).then(result => {
    res.status(200).json({
      data: result
    });
  }).catch(err => {
    res.status(400).json({
      message: err,
    });
  });
});

module.exports = router;