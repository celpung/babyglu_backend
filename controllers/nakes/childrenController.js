var express = require('express');
var router = express.Router();

const models = require('../../models');

router.get('/', async function (req, res) {
  const district = req.auth.data.puskesmas.district;
  console.log(district);
  await models.Children.findAll({
    include: [
      'user',
      {
        model: models.Checkup,
        as: 'checkup',
        include: ['posyandu', 'kader', 'vaccination', { model: models.AksiPenanganan, as: 'aksi_penanganan' }],
      },
    ],
  }).then((result) => {
    const normal = result.filter((val) => val.status === 'normal');
    const gejala = result.filter((val) => val.status === 'gejala');
    const stunting = result.filter((val) => val.status === 'stunting');

    let nm = [];
    normal.forEach((element) => {
      let a = element.checkup;
      a.forEach((ele) => {
        if (ele.posyandu.district === district) {
          nm.push(element);
        }
      });
    });

    let gj = [];
    gejala.forEach((element) => {
      let a = element.checkup;
      a.forEach((ele) => {
        if (ele.posyandu.district === district) {
          gj.push(element);
        }
      });
    });

    let st = [];
    stunting.forEach((element) => {
      let a = element.checkup;
      a.forEach((ele) => {
        if (ele.posyandu.district === district) {
          st.push(element);
        }
      });
    });

    res.status(200).json({
      data: {
        normal: nm,
        gejala: gj,
        stunting: st,
        read: req.auth.data,
      },
    });
  });
});

/**
 * get all vaccine data
 */
router.get('/vaccine', async function (req, res) {
  models.Vaccine.findAll().then((result) => {
    res.status(200).json({
      data: result,
    });
  });
});

router.post('/update', async function (req, res) {
  models.Checkup.update(
    {
      tall: req.body.tall,
      weight: req.body.weight,
      headCircumference: req.body.headCircumference,
      armCircumference: req.body.armCircumference,
    },
    { where: { id: req.body.id } },
  ).then((result) => {
    res.json({
      status: true,
      msg: 'success',
      data: result,
    });
  });
});

// get children data by id
router.get('/:id', async function (req, res) {
  models.Children.findByPk(req.params.id, {
    include: [
      'user',
      {
        model: models.Checkup,
        as: 'checkup',
        include: ['posyandu', 'kader', { model: models.Vaccination, as: 'vaccination', include: ['vaccine'] }],
      },
    ],
  }).then((result) => {
    res.status(200).json({
      data: result,
    });
  });
});

module.exports = router;
