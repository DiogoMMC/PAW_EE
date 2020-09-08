var express = require('express');
var router = express.Router();
const Admin = require('../../models/admin');

router.get('/', function (req, res) {
  if (req.session.admin) {
    res.redirect('/')
  } else {
    res.render('./auth/adminLogin', { message: null });
  }
});

router.post('/', function (req, res) {
  const { name, password } = req.body;

  // Check if client with the same email is also registered
  Admin.findOne({ name: name, password: password }, function (err, result) {
    // sucess
    if (result) {
      // create session
      req.session.regenerate(function () {
        req.session.admin = {
          _id: result.id,
          name: result.name,
        };
        console.log(req.session);
        res.redirect('/');
      });
    }
    // invalid client
    else {
      res.render('./auth/adminLogin', {
        message: 'Login errado.',
      });
    }
  })
});

module.exports = router;