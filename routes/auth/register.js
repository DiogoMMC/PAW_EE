var express = require('express');
var router = express.Router();
const Client = require('../../models/client');
const crypto = require('crypto');

const getHashedPassword = (password) => {
  const sha256 = crypto.createHash('sha256');
  const hash = sha256.update(password).digest('base64');
  return hash;
}

router.get('/', function (req, res) {
  if (req.session.user) {
    res.redirect('/')
  } else {
    res.render('./auth/register', { message: null });
  }
});

router.post('/', function (req, res) {
  const { name, email, password } = req.body;
  const hashedPassword = getHashedPassword(password);
  
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
      password: hashedPassword
    });
    newCient.save();

    // create session
    req.session.regenerate(function () {
      req.session.user = {
        _id: newCient.id,
        name: newCient.name,
      };
      res.redirect('/');
    });
  })
});

module.exports = router;