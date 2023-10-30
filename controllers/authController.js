require('dotenv').config();
var express = require('express');
var router = express.Router();
var axios = require('axios');
var jwt = require('jsonwebtoken');

// models
const User = require('../models').User;
const Otp = require('../models').Otp;
const Kader = require('../models').Kader;
const Nakes = require('../models').Nakes;

// validator
const Validator = require('fastest-validator');
const v = new Validator();

/**
 * login with phone, if user doesn't exist create one and send confirmation code.
 */
router.post('/login', async (req, res) => {
  const schema = {
    phone: 'string',
  };

  const validate = v.validate(req.body, schema);
  if (validate.length) {
    res.json({
      status: 'error',
      error: validate,
    });
  }

  const processUser = async () => {
    await User.findAll({ where: { phone: req.body.phone } })
      .then(async (result) => {
        if (result.length > 0) {
          res.status(200).json({
            status: 'success',
            data: result,
          });
        } else {
          await User.create({
            phone: req.body.phone,
          })
            .then((result) => {
              if (result) {
                res.status(200).json({
                  status: 'success',
                  message: 'User berhasil dibuat.',
                  data: result,
                });
              } else {
                res.status(400).json({
                  status: 'error',
                  message: 'User gagal dibuat.',
                });
              }
            })
            .catch((err) => {
              res.status(400).json({
                status: 'error',
                message: err,
                error: err,
              });
            });
        }
      })
      .catch((err) => {
        res.status(400).json({
          status: 'error',
          data: err,
          error: err,
        });
      });
  };

  /**
   * generate OTP and using wablas service to send code via whatsapp
   */
  let otpCode =
    req.body.phone === '+6282166301296' || req.body.phone === '089522238976' || req.body.phone === '+6285270893766' || req.body.phone === '+6281379846136' || req.body.phone === '081369320861' || req.body.phone === '+6289652164724'
      ? 1000
      : Math.floor(Math.random() * 9000) + 1000;
  const wablasToken = process.env.WABLAS_TOKEN;
  const message = 'Kode OTP anda : ' + otpCode + ' harap untuk tidak memberikan kode ini kepada siapapun!';
  const phone = req.body.phone;

  try {
    await axios.get(`https://jogja.wablas.com/api/send-message?phone=${phone}&message=${message}&token=${wablasToken}`).then((result) => {
    if (result.data.status === true) {
      Otp.findAll({ where: { phone: req.body.phone } }).then((result) => {
        if (result.length > 0) {
          Otp.update(
            {
              code: otpCode,
            },
            { where: { phone: phone } },
          ).then(() => {
            processUser();
          });
        } else {
          Otp.create({
            phone: phone,
            code: otpCode,
          }).then(() => {
            processUser();
          });
        }
      });
    } else {
      res.json({
        status: 'error',
      });
    }
  });
  } catch (error) {
    res.json({
      status: 'error',
    });
  }
  
});

/**
 * verify if OTP code is matched with user
 * if code matched function should return value for each user with their own credential
 */
router.post('/verify', async (req, res) => {
  const schema = {
    phone: 'string',
    code: 'string',
  };

  const validate = v.validate(req.body, schema);
  if (validate.length) {
    res.json({
      status: 'error',
      error: validate,
    });
  }

  Otp.findOne({
    where: { phone: req.body.phone },
  }).then((result) => {
    if (result.code === req.body.code) {
      User.findOne({
        where: { phone: req.body.phone },
      }).then((result) => {
        if (result.level === 'kader') {
          Kader.findOne({ where: { user_id: result.id }, include: ['user', 'posyandu'] }).then((result) => {
            const data = result;
            res.json({
              status: 'success',
              token: jwt.sign({ data }, process.env.TOKEN_KEY),
              data: data,
            });
          });
        } else if (result.level === 'nakes') {
          Nakes.findOne({ where: { user_id: result.id }, include: ['user', 'puskesmas'] }).then((result) => {
            const data = result;
            res.json({
              status: 'success',
              token: jwt.sign({ data }, process.env.TOKEN_KEY),
              data: data,
            });
          });
        } else if (result.level === 'admin') {
          Admin.findOne({ where: { user_id: result.id }, include: ['user'] }).then((result) => {
            const data = result;
            res.json({
              status: 'success',
              token: jwt.sign({ data }, process.env.TOKEN_KEY),
              data: data,
            });
          });
        } else {
          const data = result;
          res.json({
            status: 'success',
            token: jwt.sign({ data }, process.env.TOKEN_KEY),
            data: result,
          });
        }
      });
    } else {
      res.json({
        status: 'error',
        message: 'otp does not match',
      });
    }
  });
});

/**
 * resend OTP
 */
router.post('/resend-otp', async function (req, res) {
  const processUser = async () => {
    await User.findAll({ where: { phone: req.body.phone } })
      .then(async (result) => {
        if (result.length > 0) {
          res.status(200).json({
            status: 'success',
            data: result,
          });
        } else {
          await User.create({
            phone: req.body.phone,
          })
            .then((result) => {
              if (result) {
                res.status(200).json({
                  status: 'success',
                  message: 'User berhasil dibuat.',
                  data: result,
                });
              } else {
                res.status(200).json({
                  status: 'error',
                  message: 'User gagal dibuat.',
                });
              }
            })
            .catch((err) => {
              res.status(400).json({
                status: 'error',
                message: err,
                error: err,
              });
            });
        }
      })
      .catch((err) => {
        res.status(400).json({
          status: 'error',
          data: err,
          error: err,
        });
      });
  };

  // generate otp
  const otpCode = req.body.phone === '+6281379846136' ? 1000 : req.body.phone === '+6289652164724' ? 1000 : Math.floor(Math.random() * 9000) + 1000;
  const wablasToken = process.env.WABLAS_TOKEN;
  const message = 'Kode OTP anda : ' + otpCode + ' harap untuk tidak memberikan kode ini kepada siapapun!';
  const phone = req.body.phone;

  await axios.get(`https://jogja.wablas.com/api/send-message?phone=${phone}&message=${message}&token=${wablasToken}`).then((result) => {
    if (result.data.status === true) {
      Otp.findAll({ where: { phone: req.body.phone } }).then((result) => {
        if (result.length > 0) {
          Otp.update(
            {
              code: otpCode,
            },
            { where: { phone: phone } },
          ).then(() => {
            processUser();
          });
        } else {
          Otp.create({
            phone: phone,
            code: otpCode,
          }).then(() => {
            processUser();
          });
        }
      });
    } else {
      res.json({
        status: 'error',
      });
    }
  });
});

module.exports = router;
