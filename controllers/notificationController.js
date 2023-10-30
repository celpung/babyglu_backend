//require("dotenv").config();
var express = require('express');
var router = express.Router();

const models = require("../models");

/**
 * store post(notification) into database
 */
router.post('/create', async function (req, res) {
  models.Notification.create({
    title: req.params.title,
    post: req.params.post,
    user: req.params.user,
    kader: req.params.kader,
    writer_id: req.auth.data.id
  }).then(() => {
    res.status(200).json({
      message: "Artikel berhasil di post"
    });
  });
});

/**
 * find notification by "kader" criteria
 */
router.get('/kader', async function (req, res) {
  models.Notification.findAll({
    where: { forKader: true },
    include: ['user']
  }).then(async (result) => {
    const data = await result.filter(item => new Date(item.createdAt).toISOString().substring(0, 10) >= new Date().toISOString().substring(0, 10));
    res.status(200).json({
      data: data,
    });
  });
});

/**
 * find notification by "user" criteria
 */
router.get('/user', async function (req, res) {
  models.Notification.findAll({
    where: { forUser: true },
    include: ['user']
  }).then(async (result) => {
    const data = await result.filter(item => new Date(item.createdAt).toISOString().substring(0, 10) >= new Date().toISOString().substring(0, 10));
    res.status(200).json({
      data: data,
    });
  });
});


module.exports = router;