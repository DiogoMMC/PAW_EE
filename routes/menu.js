var express = require('express');
var router = express.Router();
var Product = require('../models/produtos.js');

/* GET home page. */
router.get('/', (req, res, next) => {
  Product.find()
    .then((result) => {
      res.render('menu', { products: result })
    })
    .catch((err) => {
      console.log(err);
    })
})

module.exports = router;
