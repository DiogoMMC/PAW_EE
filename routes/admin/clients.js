var express = require('express');
var router = express.Router();
var Client = require('../../models/client');


router.get('/', function (req, res, next) {
  Client.find()
    .then((result) => {
      res.render('./admin/clients', { clients: result })
    })
    .catch((err) => {
      console.log(err);
    })
});

module.exports = router;