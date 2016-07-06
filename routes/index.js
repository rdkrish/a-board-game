'use strict';
var config = require('../config');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});

router.get('/home', function(req, res, next) {
  res.render('index.html', {'config': config});
});

router.get('/user', function(req, res, next) {
  res.render('index.html', {'config': config});
});

router.get('/user/:gameId', function(req, res, next) {
  res.render('index.html', {'config': config});
});

router.get('/game', function(req, res, next) {
  res.render('index.html', {'config': config});
});

router.get('/game/:userName', function(req, res, next) {
  res.render('index.html', {'config': config});
});

router.get('/game/:userName/:gameId', function(req, res, next) {
  res.render('index.html', {'config': config});
});

router.get('/config', function(req, res, next) {
  res.json(config);
});

module.exports = router;
