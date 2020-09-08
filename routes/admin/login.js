var express = require('express');
var router = express.Router();
const Admin = require('../../models/admin');
const crypto = require('crypto');

const getHashedPassword = (password) => {
  const sha256 = crypto.createHash('sha256');
  const hash = sha256.update(password).digest('base64');
  return hash;
}

router.get('/', function (req, res) {
  if (req.session.admin) {
    res.redirect('/')
  } else {
    res.render('./admin/login', { message: null });
  }
});

router.post('/', function (req, res) {
  const { name, password } = req.body;
  const hashedPassword = getHashedPassword(password);

  // Check if amin with the same name is also registered
  Admin.findOne({ name: name, password: hashedPassword }, function (err, result) {
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
    // invalid admin
    else {
      res.render('./admin/login', {
        message: 'Login errado.',
      });
    }
  })
});

module.exports = router;