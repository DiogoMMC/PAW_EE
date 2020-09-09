var express = require('express');
var router = express.Router();
var Product = require('../../models/produtos.js');

router.get('/', function (req, res, next) {
  Product.find()
    .then((result) => {
      res.render('./admin/menu', { products: result })
    })
    .catch((err) => {
      console.log(err);
    })
});

router.put('/:productID', function (req, res, next) {
  const { title, price } = req.body;
  const productID = req.params.productID;

  Product.findByIdAndUpdate(productID, {
    title: title,
    price: price,
  })
    .then((result) => {
      req.session.success = "Produto editado com sucesso.";
      res.redirect('/admin/menu')
    })
    .catch((err) => {
      console.log(err);
    })
});

router.delete('/:productID', function (req, res, next) {
  const productID = req.params.productID;

  Product.findByIdAndDelete(productID)
    .then((result) => {
      req.session.success = "Produto apagado com sucesso.";
      res.redirect('/admin/menu')
    })
    .catch((err) => {
      console.log(err);
    })
});

router.post('/', function (req, res, next) {

  const { title, price, type } = req.body;

  var newProduct = new Product({
    title: title,
    price: price,
    type: type,
  });
  newProduct.save()
    .then(() => {
      req.session.success = "Produto criado com sucesso.";
      res.redirect("/admin/menu")
    })
    .catch((err) => {
      console.log(err);
    })
});

module.exports = router;