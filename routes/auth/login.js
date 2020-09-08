var express = require('express');
var router = express.Router();
const Client = require('../../models/client');

router.get('/', function (req, res) {
  if (req.session.user) {
    res.redirect('/')
  } else {
    res.render('./auth/login', { message: null });
  }
});

router.post('/', function (req, res) {
  const { email, password } = req.body;

  // Check if client with the same email is also registered
  Client.findOne({ email: email, password: password }, function (err, result) {
    // sucess
    if (result) {
      // create session
      req.session.regenerate(function () {
        req.session.user = {
          _id: result.id,
          name: result.name,
          email: result.email,
        };
        console.log(req.session);
        res.redirect('/');
      });
    }
    // invalid client
    else {
      res.render('./auth/login', {
        message: 'Login errado.',
      });
    }
  })
});

module.exports = router;