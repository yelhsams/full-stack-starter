'use strict'

const express = require('express');
const HttpStatus = require('http-status-codes');

const interceptors = require('../interceptors');

const router = express.Router();

router.post('/login', function(req, res, next) {
  interceptors.passport.authenticate('local', function(err, user) {
    if (err) {
      next(err);
    } else if (user) {
      req.logIn(user, function(err) {
        if (err) {
          next(err);
        } else {
          res.status(HttpStatus.OK).json(user);
        }
      });
    } else {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).end();
    }
  })(req, res, next);
});

/// handle logging out the current user
router.get('/logout', function(req, res){
  req.logout();
  res.status(HttpStatus.NO_CONTENT).end();
});

module.exports = router;
