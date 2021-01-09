'use strict';

const express = require('express');
const path = require('path');
const router = express.Router();

const models = require('../models');

/// configure serving any static file in public folder
router.use(express.static(path.join(__dirname, '../public')));

/// serve libraries installed as node modules
router.use('/libraries/bootstrap', express.static(path.join(__dirname, '../node_modules/bootstrap/dist')));
router.use('/libraries/cleave', express.static(path.join(__dirname, '../node_modules/cleave.js/dist')));
router.use('/libraries/fontawesome', express.static(path.join(__dirname, '../node_modules/@fortawesome/fontawesome-free')));
router.use('/libraries/jquery', express.static(path.join(__dirname, '../node_modules/jquery/dist')));

/// serve some paths from other nested routers
router.use('/login', require('./login'));
router.use('/passwords', require('./passwords'));
router.use('/register', require('./registrations'));
router.use('/api', require('./api'));

/// handle logging out the current user
router.get('/logout', function(req,res,next){
  req.logout();
  req.flash('info', 'You have been logged out.');
  res.redirect('/');
});

/// serve up the homepage
router.get('/', async function(req, res, next) {
  const educationItems = await models.SectionItem.findAll({
    include: models.Section,
    order: [['endedAt', 'DESC'], ['startedAt', 'DESC']],
    where: {
      '$Section.slug$': 'education'
    }
  });
  res.render('index', { educationItems });
});

module.exports = router;
