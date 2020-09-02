var express = require('express');
var router = express.Router();
//var mongojs = require('mongojs');
//var db = mongojs('mongodb://pawee:pawee@eepaw-shard-00-00.fmmvt.mongodb.net:27017,eepaw-shard-00-01.fmmvt.mongodb.net:27017,eepaw-shard-00-02.fmmvt.mongodb.net:27017/pawdb?ssl=true&replicaSet=atlas-132jp3-shard-0&authSource=admin&retryWrites=true&w=majority',['tasks'])

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('HOME PAGE');
  
});

module.exports = router;
