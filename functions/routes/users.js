const express = require('express');
const router = express.Router();


const usersController = require('../controllers/users_controller');

router.get('/sign-in-up', usersController.signInUp)
router.get('/sign-in', usersController.signIn)
router.get('/sign-up', usersController.signUp)
router.get('/sessionLogout', usersController.sessionLogout)
router.get('/forgot-password', usersController.forgotPassword)

router.post('/sessionLogin', usersController.sessionLogin);

module.exports = router;