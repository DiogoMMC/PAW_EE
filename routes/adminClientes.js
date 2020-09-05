var express = require('express');
var router = express.Router();
var client = require('../models/client');


router.get('/', function(req, res, next) {
  client.find()
  .then((result)=>{ 
      res.render('./adminViews/adminClientes',{ cliente:result }  )
  })
  .catch((err)=>{
      console.log(err);
  })
  });

  module.exports = router;