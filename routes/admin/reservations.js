var express = require('express');
var router = express.Router();
var Reservation = require('../../models/reservation')
var Product = require('../../models/produtos.js');


router.get('/', function (req, res, next) {
  Reservation.find()
    .populate('client')
    .then((reservations) => {
      Product.find()
        .then((products) => {
          res.render('./admin/reservations', {
            reservations: reservations,
            products: products
          });
        })
        .catch((err) => {
          console.log(err);
        })
    })
    .catch((err) => {
      console.log(err);
    })
});

router.put('/:reservationID', function (req, res, next) {
  const { numberOfPeople, price, meal, date, comments, state, products } = req.body;
  const reservationID = req.params.reservationID;

  Reservation.findByIdAndUpdate(reservationID, {
    numberOfPeople: numberOfPeople,
    price: price,
    meal: meal,
    date: date,
    comments: comments,
    state: state,
    products: products
  })
    .then((result) => {
      req.session.success = "Reserva editada com sucesso.";
      res.redirect('/admin/reservations');
    })
    .catch((err) => {
      console.log(err);
    })
});


module.exports = router;