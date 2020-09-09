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

router.delete('/:clientID', function (req, res, next) {
  const clientID = req.params.clientID;

  Client.findByIdAndDelete(clientID)
    .then((result) => {
      req.session.success = "Cliente apagado com sucesso.";
      res.redirect('./admin/clients')
    })
    .catch((err) => {
      console.log(err);
    })
});

module.exports = router;