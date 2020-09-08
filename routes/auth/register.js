var express = require('express');
var router = express.Router();
const Client = require('../../models/client');

router.get('/', function (req, res) {
  if (req.session.user) {
    res.redirect('/')
  } else {
    res.render('./auth/register', { message: null });
  }
});

router.post('/', function (req, res) {
  const { name, email, password } = req.body;

  // Check if client with the same email is also registered
  Client.exists({ email: email }, function (err, result) {
    if (result) {
      res.render('./auth/register', {
        message: 'Email já registado',
      });

      return;
    }
    // Store client into the database if you are using one
    var newCient = new Client({
      name: name,
      email: email,
      password: password
    });
    newCient.save();

    res.render('./home');
  })
});

module.exports = router;