var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  if (req.session.user || req.session.admin) {
    req.session.destroy(function () {
      res.redirect('/');
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;