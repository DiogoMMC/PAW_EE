var express = require('express');
var router = express.Router();
var Reservation = require('../models/reservation')
var Product = require('../models/produtos.js');


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
  const { numberOfPeople, meal, date, comments,products } = req.body;
  const userID = res.locals.user._id;

  // compare dates
  if (date < new Date())
    console.log("FODA-SE");

  Product.find().where('_id').in(products).exec()
    .then((results) => {
      console.log(results);
      var price = 0;
      results.forEach(product => {
        price += product.price;
      });
      if (price == 0) price = null;
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
      // redirect to reservas
      res.redirect('/reservations');
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
      res.redirect('/reservations');
    })
    .catch((err) => {
      console.log(err);
    })});


module.exports = router;