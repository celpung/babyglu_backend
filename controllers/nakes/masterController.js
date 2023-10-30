var express = require('express');
var router = express.Router();

const models = require('../../models');

router.get('/', function (req, res) {
  models.User.findAll({
    where: { level: 'user', status: 'active' },
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
  }).then(async (result) => {
    // let data = [];
    // result.forEach(element => {
    //   element.children.forEach(child => {
    //     child.checkup.forEach(check => {
    //       if (check.posyandu.id = req.auth.data.posyandu_id) {
    //         if (!data.includes(element)) {
    //           data.push(element);
    //         }
    //       }
    //     });
    //   });
    // });
    res.status(200).json({
      data: result,
    });
  });
});

module.exports = router;
