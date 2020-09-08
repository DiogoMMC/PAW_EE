var express = require('express');
var router = express.Router();

var clientRouter = require('./clients')
var menuRouter = require('./menu')
var reservationsRouter = require('./reservations')
var loginRouter = require('./login');

router.use('/login', loginRouter);
router.use('/menu', menuRouter);
router.use('/clients', clientRouter);
router.use('/reservations', reservationsRouter);

module.exports = router;
