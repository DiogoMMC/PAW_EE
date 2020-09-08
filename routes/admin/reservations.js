var express = require('express');
var router = express.Router();
var Reservation = require('../../models/reservation')


router.get('/', function (req, res, next) {
  Reservation.find()
    .then((result) => {
      res.render('./admin/reservations', { reservations: result })
    })
    .catch((err) => {
      console.log(err);
    })
});


module.exports = router;