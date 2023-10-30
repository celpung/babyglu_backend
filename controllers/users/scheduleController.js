var express = require('express');
var router = express.Router();

const models = require('../../models');

/**
 * get schedule
 */
router.get("/:id", async function (req, res) {
  console.log('id : ', req.params.id);

  var vaccineName;
  var posyanduName;
  await models.Children.findByPk(req.params.id, {
    include: [{ model: models.Checkup, as: 'checkup', include: ["posyandu", { model: models.Kader, as: "kader", include: ["user"] }, { model: models.Vaccination, as: "vaccination", include: ["vaccine"] }] }]
  }).then(async (result) => {
    let nextVaccineId = result.checkup[0].vaccination.vaccine.id + 1;
    posyanduName = result.checkup[0].posyandu.name;
    const findvaccine = await models.Vaccine.findByPk(nextVaccineId);
    vaccineName = findvaccine != null ? findvaccine : '-';
    await models.Schedule.findAll({
      limit: 1,
      where: {posyandu_id: result.checkup[0].posyandu.id}
    }).then(result => {
      data = {
        schedule: result.schedule,
        vaccineName: vaccineName.name,
        posyanduName: posyanduName,
      }
      res.status(200).json({
        data: data
      })
    });
  });
});

module.exports = router;