'use strict';

var express = require('express');
var controller = require('./job.controller');

var router = express.Router();

router.get('/', controller.index);
router.put('/getIndeedJobs/', controller.getIndeedJobs);
router.put('/getIndeedJobs/mobile/', controller.onlyIndeedJobs);
router.put('/saveJobs/:id', controller.show);
router.get('/recruiterJobs/:id', controller.getRecruiterJobs);
router.post('/', controller.create);
router.post('/cheerio', controller.getCheerio);
router.put('/:id', controller.update);
router.put('/updateRecruiterJob/:id', controller.updateRecruiterJob);
router.put('/:id/removeUser/:userId', controller.removeUser);
router.put('/editRecruiterJob/:id', controller.editRecruiterJob);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.get('/:id/showJobs', controller.jobShow);

module.exports = router;