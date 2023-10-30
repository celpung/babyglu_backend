var express = require('express');
var router = express.Router();

const models = require('../../models');

/**
 * get report
 */
router.get('/', function (req, res) {
  models.Article.findAll({}).then((result) => {
    res.json({
      data: result,
    });
  });
});

router.post('/create', async function (req, res) {
  await models.Article.create({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status,
    image: req.body.image,
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

router.post('/update/:id', async function (req, res) {
  models.Article.update(
    {
      title: req.body.title,
      content: req.body.content,
      status: req.body.status,
      image: req.body.image,
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

module.exports = router;
