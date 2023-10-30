var express = require('express');
var router = express.Router();
const models = require("../../models");
var multer = require('multer');

/**
 * crate an article and post into datbase
 */
router.post('/add', async function (req, res) {
  models.Article.create({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status,
    category_id: req.body.category_id,
    image: req.body.imageName,
  }).then(() => {
    res.status(200).json({
      status: 'success',
    })
  })
});

/**
 * uploading image for the article
 */
router.post('/upload-article-image', async function (req, res) {
  const date = new Date().toISOString();
  const newDate = date.replace(/[^0-9]/g, "");
  const phone = req.auth.data.phone.replace(/[^0-9]/g, "");
  const imageName = phone + newDate + ".jpg"

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/images/articles");
    },
    filename: function (req, file, cb) {
      cb(null, imageName);
    }
  });

  const upload = multer({ storage: storage }).single("image");

  upload(req, res, async function (err) {
    if (err) {
      return res.json({
        status: "error",
        message: err.message,
      });
    }
  });

  res.status(200).json({
    imageName: imageName,
  })
});

/**
 * getting the article for user
 */
router.get('/', async function (req, res, next) {
  await models.Article.findAll({
    where: { status: 'user' },
    include: ['category']
  }).then(result => {
    res.status(200).json({
      data: result,
    });
  });
});

module.exports = router;