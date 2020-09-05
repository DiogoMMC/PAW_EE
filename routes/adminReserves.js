var express = require('express');
var router = express.Router();
var Reservation = require('../models/reservation')


router.get('/', function(req, res, next) {
  Reservation.find()
        .then((result)=>{ 
            res.render('./adminViews/adminReserves',{ reservations: result }  )
        })
        .catch((err)=>{
            console.log(err);
        })
});


  module.exports = router;