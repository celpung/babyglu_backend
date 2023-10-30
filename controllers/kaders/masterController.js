var express = require('express');
var router = express.Router();

const models = require("../../models");

router.get('/', function (req, res) {
  models.User.findAll({
    include: [{
      model: models.Children, as: 'children', include: [{
        model: models.Checkup, as: 'checkup', include: ['posyandu']
      }]
    }]
  }, { where: { level: "user", status: 'active' } }).then(async (result) => {
    let data = [];

    result.forEach(element => {
      let children = element.children;
      children.forEach(children => {
        var checkup = children.checkup;
        checkup.forEach(checkup => {
          if (checkup.posyandu.id === req.auth.data.posyandu_id) {
            console.warn('c_pos : ', checkup.posyandu.id)
            console.warn('m_pos : ', req.auth.data.posyandu_id)
            let check = data.find(val => val.id === element.id)
            if (!check) {
              data.push(element);
            }
          }
        });
      });
    });
    res.status(200).json({
      data: data,
    });
  });
});

module.exports = router;