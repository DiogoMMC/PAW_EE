var express = require('express');
var router = express.Router();
var Product = require('./../models/produtos.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin');
});

router.get('/ementa', function(req, res, next) {
  Product.find()
        .then((result)=>{ 
            res.render('./adminViews/adminEmenta',{ products:result }  )
        })
        .catch((err)=>{
            console.log(err);
        })
});

router.get('/clients', function(req, res, next) {
  res.render('./adminViews/adminClients');
});

router.get('/reserves', function(req, res, next) {
  res.render('./adminViews/adminReserves');
});



module.exports = router;
