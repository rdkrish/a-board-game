'use strict';
var config = require('../config');
var express = require('express');
var router = express.Router();

router.games = {};
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

router.get('/game/all', function(req, res, next) {
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

router.get('/games', function(req, res, next) {
  res.json(router.games);
});

router.get('/games/:gameId', function(req, res, next) {
  var gameId = req.params.gameId;
  if (router.games[gameId] !== undefined) {
    res.json(router.games[gameId]);
  }
});

router.put('/games', function(req, res, next) {
  var game = req.body;
  if (router.games[game.gameId] !== undefined) {
    router.games[game.gameId].users.push(game.user);
  } else {
    router.games[game.gameId] = {gameId: game.gameId, users: [game.user]};
  }
  res.json(router.games);
});

module.exports = router;
