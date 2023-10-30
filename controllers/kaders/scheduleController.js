var express = require('express');
var router = express.Router();

const models = require("../../models");

/**
 * create schedule
 */
router.post('/create', async function (req, res) {
  const sch = req.body.schedule;
  let lastSch = new Date();

  await models.Schedule.findAll({
    limit: 1,
    where: { posyandu_id: req.auth.data.posyandu_id },
    order: [
      ["createdAt", "DESC"]
    ]
  }).then(result => {
    if (result.length > 0) {
      lastSch = new Date(result[0].schedule);
    }
  });

  if (new Date(sch) <= new Date(lastSch)) {
    res.json({
      status: "error",
      message: "Tanggal tidak dapat digunakan!"
    });
    return;
  }

  // set date time but the atrr's varchar and need to be fix soon
  UTCTime = new Date(req.body.schedule)
  let date = UTCTime.toISOString().split('T')[0]
  let time1 = req.body.schedule.substring(11);
  let myTime = time1.substring(0, 8);
  let dateVal = `${date} ${myTime}`;
  models.Schedule.create({
    schedule: dateVal,
    posyandu_id: req.auth.data.posyandu_id,
    kader_id: req.auth.data.id,
  }).then(result => {
    res.status(200).json({
      data: result,
      message: "Jadwal berhasil dibuat"
    });
  });
});

/**
 * get schedule
 */
router.get("/", function (req, res) {
  models.Schedule.findAll({
    limit: 1,
    where: { posyandu_id: req.auth.data.posyandu_id },
    order: [['createdAt', 'DESC']]
  }).then(result => {
    if(result) {
      const data = {
        id: result[0].id,
        schedule: result[0].schedule,
        posyandu: req.auth.data.posyandu.name,
      }
      res.status(200).json({
        data: data,
      })
    } else {
      res.json({
        data: null,
      })
    }    
  }).catch(err => {
    res.status(400).json({
      msg: err,
    });
  });
});

router.post('/update', async function (req, res) {
  UTCTime = new Date(req.body.schedule)
  let date = UTCTime.toISOString().split('T')[0]
  let time1 = req.body.schedule.substring(11);
  let myTime = time1.substring(0, 8);
  let dateVal = `${date} ${myTime}`;
  await models.Schedule.update({
    schedule: dateVal
  }, { where: { id: req.body.id } }).then((result) => {
    if (result) {
      res.status(200).json({
        msg: 'Data berhasil di update!'
      });
    } else {
      res.status(400).json({
        msg: 'Data gagal di update!'
      });
    }
  });
});

module.exports = router;