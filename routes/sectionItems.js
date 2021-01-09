'use strict'

const express = require('express');
const HttpStatus = require('http-status-codes');

const interceptors = require('./interceptors');
const models = require('../models');

const router = express.Router();

/* GET the new SectionItem form */
router.get('/new', interceptors.requireLogin, async function(req, res) {
  const sections = await models.Section.findAll({order: [['name', 'ASC']]});
  const section = sections.find(s => s.slug == req.query.section) || sections[0];
  const sectionItem = models.SectionItem.build({
    SectionId: section.id
  });
  res.render('sectionItems/new', {
    sections,
    sectionItem
  });
});

/* GET the edit form for an existing SectionItem */
router.get('/:id/edit', interceptors.requireLogin, async function(req, res) {
  const sections = await models.Section.findAll({order: [['name', 'ASC']]});
  const sectionItem = await models.SectionItem.findByPk(req.params.id);
  res.render('sectionItems/edit', {
    sections,
    sectionItem
  });
});

router.post('/:id', interceptors.requireLogin, async function(req, res) {
  req.body.endedAt = req.body.endedAt || null;
  const sectionItem = await models.SectionItem.findByPk(req.params.id);
  try {
    await sectionItem.update(req.body);
    res.status(HttpStatus.OK).redirect('/');
  } catch (error) {
    const sections = await models.Section.findAll({order: [['name', 'ASC']]});
    res.render('sectionItems/new', {
      error,
      sections,
      sectionItem
    });  
  }
});

/* POST to create a new SectionItem */
router.post('/', interceptors.requireLogin, async function(req, res) {
  req.body.endedAt = req.body.endedAt || null;
  const sectionItem = models.SectionItem.build(req.body);
  try {
    await sectionItem.save();
    res.status(HttpStatus.CREATED).redirect('/');  
  } catch (error) {
    const sections = await models.Section.findAll({order: [['name', 'ASC']]});
    res.render('sectionItems/new', {
      error,
      sections,
      sectionItem
    });  
  }
});

module.exports = router;
