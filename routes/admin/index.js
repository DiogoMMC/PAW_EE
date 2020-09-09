var express = require('express');
var router = express.Router();

var clientRouter = require('./clients')
var menuRouter = require('./menu')
var reservationsRouter = require('./reservations')
var loginRouter = require('./login');

function restrict(req, res, next) {
  if (req.session.admin) {
    next();
  } else {
    res.redirect('/admin/login');
  }
}

router.use('/login', loginRouter);
router.use('/menu', restrict, menuRouter);
router.use('/clients', restrict, clientRouter);
router.use('/reservations', restrict, reservationsRouter);

module.exports = router;
