const auth = require('../firebase/authenticator');
const express = require('express');
const router = express.Router();
const routinesControllers = require('../controllers/routines-controllers');
const historyControllers = require('../controllers/history-controllers');
const userControllers = require('../controllers/user-controllers');

router.get('/routines/:id', auth.authenticateUser, routinesControllers.getRoutines);

router.patch('/routines/:id', auth.authenticateUser, routinesControllers.updateRoutines);

router.post('/routines', auth.authenticateUser, routinesControllers.postRoutines);

router.get('/history/:id', auth.authenticateUser, historyControllers.getHistory);

router.patch('/history/:id', auth.authenticateUser, historyControllers.updateHistory);

router.post('/history', auth.authenticateUser, historyControllers.postHistory);

router.post('/user', auth.authenticateUser, userControllers.postUser);

router.get('/getUser/:email', auth.authenticateUser, userControllers.getUserByEmail);

module.exports = router;