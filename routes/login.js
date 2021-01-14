'use strict'

const express = require('express');
const HttpStatus = require('http-status-codes');

const interceptors = require('./interceptors');

const router = express.Router();

/* GET the login form */
router.get('/', function(req, res, next) {
  req.logout();
  res.render('login/new', {
    redirectURI: req.query.redirectURI
  });
});

/* POST to submit login and password */
router.post('/', function(req, res, next) {
  interceptors.passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      if (req.accepts('html')) {
        let redirectURI = '/login';
        if (req.body.redirectURI != '') {
          redirectURI = `${redirectURI}?redirectURI=${encodeURIComponent(req.body.redirectURI)}`;
        }
        req.flash('error', 'The email and/or password was incorrect.');
        return res.redirect(redirectURI);
      } else {
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).end();
      }
    }
    req.logIn(user, function(err) {
      if (req.accepts('html')) {
        if (req.body.redirectURI != '') {
          res.redirect(req.body.redirectURI);
        } else {
          res.redirect('/');
        }
      } else {
        return res.status(HttpStatus.OK).json(user);
      }
    });
  })(req, res, next);
});

module.exports = router;
