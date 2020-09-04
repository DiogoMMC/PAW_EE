var express = require('express');
var router = express.Router();
var Product = require('./../models/produtos.js');

router.get('/', function(req, res, next) {
    Product.find()
          .then((result)=>{ 
              res.render('./adminViews/adminEmenta',{ products:result }  )
          })
          .catch((err)=>{
              console.log(err);
          })
  });
  
  module.exports = router;