var express = require('express');
var router = express.Router();
var Reservation = require('../models/reservation')
var Product = require('../models/produtos');
var Client = require('../models/client');


router.get('/', function (req, res, next) {
  Reservation.find({ client: res.locals.user._id })
    .then((reservations) => {
      Product.find()
        .then((products) => {
          res.render('./reservations', {
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

router.post('/', function (req, res, next) {
  const { numberOfPeople, meal, date, comments, products } = req.body;
  const userID = res.locals.user._id;

  // compare dates
  if (new Date(date) < new Date()) {
    req.session.error = "Data cenas"
    res.redirect('/reservations');
    return;
  }

  Product.find().where('_id').in(products).exec()
    .then((results) => {
      var price = 0;
      results.forEach(product => {
        price += product.price;
      });
      if (price == 0) price = null;
      else price = Math.round(price * 95) / 100; // 5% discount (2 decimals)
      // save reservation
      var newReservation = new Reservation({
        client: userID,
        numberOfPeople: numberOfPeople,
        courses: products,
        price: price,
        state: "hold",
        meal: meal,
        date: date,
        comments: comments,
      });
      newReservation.save();
      // save reservation in client
      Client.findByIdAndUpdate(userID,
        { $push: { reservations: newReservation._id } },
      ).then(() => {
        // redirect to reservas
        req.session.success = "Reserva criada com sucesso."
        res.redirect('/reservations');
      });

    })
    .catch((err) => {
      console.log(err);
    })
});

router.put('/:reservationID', function (req, res, next) {
  const reservationID = req.params.reservationID;
  const { state } = req.body;

  Reservation.findByIdAndUpdate(reservationID, { state: state })
    .then((result) => {
      req.session.success = "Reserva cancelada com sucesso."
      res.redirect('/reservations');
    })
    .catch((err) => {
      console.log(err);
    })
});


module.exports = router;