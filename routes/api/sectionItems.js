'use strict';

const express = require('express');
const router = express.Router();

const models = require('../../models');

router.get('/', async function(req, res) {
  const where = {};
  if (req.query.section) {
    where['$Section.slug$'] = req.query.section;
  }
  const items = await models.SectionItem.findAll({
    include: models.Section,
    order: [['endedAt', 'DESC']],
    where
  });
  res.json(items);
});

module.exports = router;
