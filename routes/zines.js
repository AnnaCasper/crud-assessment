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

//POST new article
router.post('/articles', function(req, res, next){
  zineCollection.insert({
    title: req.body.title,
    backgroundUrl: req.body.backgroundUrl,
    darkBackground: req.body.darkBackground,
    excerpt: req.body.excerpt,
    body: req.body.body
  });
  res.redirect('/zines')
});


module.exports = router;
