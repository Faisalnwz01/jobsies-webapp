'use strict';

var express = require('express');
var controller = require('./job.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.post('/cheerio', controller.getCheerio);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.get('/:id/showJobs', controller.jobShow);

module.exports = router;