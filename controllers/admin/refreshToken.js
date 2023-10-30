var express = require('express');
var router = express.Router();
const models = require('../../models');
import jwt from 'jsonwebtoken';
const config = process.env;

router.get('/token', async function (req, res) {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    const admin = await models.Admin.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!admin[0]) return res.sendStatus(403);
    jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403);
      const adminId = admin[0].id;
      const email = admin[0].email;
      const accessToken = jwt.sign({ adminId, email }, config.TOKEN_KEY, {
        expiresIn: '15s',
      });
      res.json({ accessToken });
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
