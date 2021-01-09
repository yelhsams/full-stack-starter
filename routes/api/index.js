const express = require('express');
const router = express.Router();

router.use('/sectionItems', require('./sectionItems'));
router.use('/uploads', require('./uploads'));
router.use('/users', require('./users'));

module.exports = router;
