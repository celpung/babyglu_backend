var express = require('express');
var router = express.Router();

const models = require('../../models');

router.get('/:id', function (req, res) {
  models.User.findOne({
    include: [
      {
        model: models.Children,
        as: 'children',
        include: [
          {
            model: models.Checkup,
            as: 'checkup',
            include: ['posyandu'],
          },
        ],
      },
    ],
    where: { level: 'user', nik: req.params.id },
  })
    .then((result) => {
      res.status(200).json({
        data: result,
      });
    })
    .catch((err) => {
      res.json({
        message: 'Data tidak ditemukan',
        error: err,
      });
    });
});

module.exports = router;
