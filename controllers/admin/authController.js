var express = require('express');
var router = express.Router();
const models = require('../../models');
var bcrypt = require('bcrypt');
const config = process.env;
var jwt = require('jsonwebtoken');

router.post('/register', async function (req, res) {
  const { email, name, password, confPassword } = req.body;
  let emailAdmin = await models.Admin.findOne({
    where: {
      email: email,
    },
  });
  if (emailAdmin) {
    return res.status(404).json({
      status: false,
      message: 'email sudah digunakan',
    });
  }
  if (password !== confPassword) return res.status(400).json({ message: 'Password dan Confirm Password tidak cocok' });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await models.Admin.create({
      email: email,
      password: hashPassword,
      name: name,
    }).then((ress) => {
      return res.status(200).json({
        status: true,
        data: ress,
        message: 'Register Berhasil',
      });
    });
  } catch (error) {
    console.log(error);
  }
});

router.post('/login', async function (req, res) {
  const { email, password } = req.body;

  const response = await models.Admin.findOne({
    where: [
      {
        email: email,
      },
    ],
  });
  if (response) {
    const match = await bcrypt.compare(password, response.password);
    if (!match) return res.status(400).json({ message: 'Password Salah' });
    const adminId = response.id;
    const email = response.id;
    const accessToken = jwt.sign({ adminId, email }, config.TOKEN_KEY, {
      expiresIn: '1d',
    });
    const refreshToken = jwt.sign({ adminId, email }, config.REFRESH_TOKEN_SECRET, {
      expiresIn: '1d',
    });
    await models.Admin.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: adminId,
        },
      },
    );
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken, adminId });
  } else {
    return res.status(404).json({
      message: 'email tidak ditemukan',
    });
  }
});

// export const Logout = async (req, res) => {
//   const refreshToken = req.cookies.refreshToken;
//   if (!refreshToken) return res.sendStatus(204);
//   const admin = await models.Admin.findAll({
//     where: {
//       refresh_token: refreshToken,
//     },
//   });
//   if (!admin[0]) return res.sendStatus(204);
//   const adminId = admin[0].id;
//   await models.Admin.update(
//     { refresh_token: null },
//     {
//       where: {
//         id: adminId,
//       },
//     },
//   );
//   res.clearCookie('refreshToken');
//   return res.sendStatus(200);
// };

module.exports = router;
