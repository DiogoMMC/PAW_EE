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
    res.render('./auth/login', { message: null });
  }
});

router.post('/', function (req, res) {
  const { email, password } = req.body;
  const hashedPassword = getHashedPassword(password);

  // Check if client with the same email is also registered
  Client.findOne({ email: email, password: hashedPassword }, function (err, result) {
    // sucess
    if (result) {
      // create session
      req.session.regenerate(function () {
        req.session.user = {
          _id: result.id,
          name: result.name,
          email: result.email,
        };
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