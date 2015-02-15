'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('recruiter'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id', auth.isAuthenticated(), controller.addJobsie);
router.put('/mobile/:id', controller.addJobsie);
router.put('/preferences/:id', auth.isAuthenticated(), controller.preferences);
router.put('/preferences/mobile/:id', controller.preferences);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
router.post('/:id', controller.update);
router.post('/:id/savedUser', controller.savedUsers);
router.post('/:id/jobPost', controller.jobPost);
router.get('/:id/resume', controller.resume); 
router.get('/:id/jobPopulate', controller.jobPopulate);
router.put('/:id/removeJob/:jobId', auth.isAuthenticated(), controller.removeJob);
router.put('/:id/removeJob/mobile/:jobId', controller.removeJob);
// router.get('/mobile/:id', controller.mobile);
module.exports = router;
