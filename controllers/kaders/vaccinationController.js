var express = require('express');
var router = express.Router();

const models = require("../../models")

/**
 * create vaccination for children
 * this function shall running side by side with checkup
 */
router.post('/', async function (req, res, next) {
  if(req.body.vaccine_id != null) {
    await models.Vaccination.create({
      children_id: req.body.children_id,
      vaccine_id: req.body.vaccine_id,
      dose: req.body.dose
    }).then(result => {
      res.status(200).json({
        data: result
      })
    }).catch(err=>{
      console.log(err);
    });
  }  
});

module.exports = router;