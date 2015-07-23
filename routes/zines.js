var express = require('express');
var router = express.Router();

var db = require('monk')(process.env.MONGOLAB_URI);
var zineCollection = db.get('zine');

//GET zines home page
router.get('/', function(req, res, next){
  res.render('zines/index');
});

//GET new article page
router.get('/articles', function(req, res, next){
  res.render('zines/new')
});

module.exports = router;
