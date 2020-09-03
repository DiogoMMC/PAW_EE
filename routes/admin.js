var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin');
});

router.get('/ementa', function(req, res, next) {
  res.render('./adminViews/adminEmenta');
});

router.get('/clients', function(req, res, next) {
  res.render('./adminViews/adminClients');
});

router.get('/reserves', function(req, res, next) {
  res.render('./adminViews/adminReserves');
});



module.exports = router;
