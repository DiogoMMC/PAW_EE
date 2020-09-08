var express = require('express');
var router = express.Router();
const Client = require('../../models/client');

router.get('/', function (req, res) {
  res.render('./auth/login', { message: null });
});

router.post('/', function (req, res) {
  const { email, password } = req.body;

  // Check if client with the same email is also registered
  Client.exists({ email: email, password: password }, function (err, result) {
    // sucess
    if(result) {
      res.render('./home');
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