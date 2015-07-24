var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI);
var zineCollection = db.get('zine');
var functions = require('../lib/javascripts/scripts.js')
//GET zines home page
router.get('/', function(req, res, next){
  zineCollection.find({ $query: {}, $orderby: { _id : -1 } } , function(err, allZines){
    res.render('zines/index', {allZines: allZines});
  });
});

//GET new article page
router.get('/articles/new', function(req, res, next){
  res.render('zines/new')
});

//POST new article
router.post('/articles', function(req, res, next){
  var errors = functions.validateForm(req.body.title, req.body.excerpt, req.body.body);
  if(errors.length === 0){
    zineCollection.insert({
      title: req.body.title,
      backgroundUrl: req.body.backgroundUrl,
      darkBackground: req.body.darkBackground,
      excerpt: req.body.excerpt,
      body: req.body.body
    });
    res.redirect('/zines');
  } else {
    res.render('zines/new', {
      errorAlert: 'Please correct the errors below:',
      errors: errors,
      title: req.body.title,
      backgroundUrl: req.body.backgroundUrl,
      darkBackground: req.body.darkBackground,
      excerpt: req.body.excerpt,
      body: req.body.body});
  }
});

//GET show page
router.get('/articles/:id', function(req, res, next){
  zineCollection.findOne({_id: req.params.id}, function(err, thisZine){
    res.render('zines/show', {thisZine: thisZine});
  });
});

//GET edit page
router.get('/articles/:id/edit', function(req, res, next){
  zineCollection.findOne({_id: req.params.id}, function(err, thisZine){
    res.render('zines/edit', {thisZine: thisZine});
  });
});

//POST updates
router.post('/articles/:id/update', function(req, res, next){
  var errors = functions.validateForm(req.body.title, req.body.excerpt, req.body.body);
    if(errors.length === 0){
      zineCollection.update({_id: req.params.id}, {$set: {
        title: req.body.title,
        backgroundUrl: req.body.backgroundUrl,
        darkBackground: req.body.darkBackground,
        excerpt: req.body.excerpt,
        body: req.body.body
      }});
      res.redirect('/zines/articles/' + req.params.id);
    } else {
      res.render('zines/edit', {
        errorAlert: "Please correct the errors below:",
        errors: errors,
        thisZine: {
          _id: req.params.id,
          title: req.body.title,
          backgroundUrl: req.body.backgroundUrl,
          darkBackground: req.body.darkBackground,
          excerpt: req.body.excerpt,
          body: req.body.body
        }
      });
    };
  });

//POST remove
router.get('/delete/:id', function(req, res, next){
  zineCollection.remove({_id: req.params.id});
  res.redirect('/zines')
});

module.exports = router;
