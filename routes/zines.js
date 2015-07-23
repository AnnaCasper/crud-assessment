var express = require('express');
var router = express.Router();

var db = require('monk')(process.env.MONGOLAB_URI);
var zineCollection = db.get('zine');

//GET zines home page
router.get('/', function(req, res, next){
  zineCollection.find({}, {$sort: {date: -1}}, function(err, allZines){
    res.render('zines/index', {allZines: allZines});
  });
});

//GET new article page
router.get('/articles/new', function(req, res, next){
  res.render('zines/new')
});

//POST new article
router.post('/articles', function(req, res, next){
  if(req.body.title){
    if(req.body.excerpt){
      if(req.body.body){
        zineCollection.insert({
          date: Date (),
          title: req.body.title,
          backgroundUrl: req.body.backgroundUrl,
          darkBackground: req.body.darkBackground,
          excerpt: req.body.excerpt,
          body: req.body.body
        });
      res.redirect('/zines');
      }
    }
  } else {
    res.render('zines/new', {error: "Please correct the errors below"})
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
  if(req.body.title){
    if(req.body.excerpt){
      if(req.body.body){
        zineCollection.update({_id: req.params.id}, {$set: {
          title: req.body.title,
          backgroundUrl: req.body.backgroundUrl,
          darkBackground: req.body.darkBackground,
          excerpt: req.body.excerpt,
          body: req.body.body
        }});
        res.redirect('/zines/articles/' + req.params.id)
      }
    }
  } else {
    zineCollection.findOne({_id: req.params.id}, function(err, thisZine){
      res.render('zines/edit', {thisZine: thisZine, error: "Please correct the errors below"})
    });
  }
});

//POST remove
router.get('/delete/:id', function(req, res, next){
  zineCollection.remove({_id: req.params.id});
  res.redirect('/zines')
});

module.exports = router;
