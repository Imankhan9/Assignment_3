var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Home',
  });
});

/* GET home listing. */
router.get('/home', function(req, res, next) {
  res.render('index', {
    title: 'Home',
  });
});

/* GET itinerary listing. */
router.get('/itinerary', function(req, res, next) {
  res.render('index', {
    title: 'Itinerary Planner',
  });
});



module.exports = router;
