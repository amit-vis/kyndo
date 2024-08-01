const express = require('express');
const router = express.Router();
const userController = require('../controller/user_controller');

router.post('/forgot-password', userController.forgotPassword);
router.post('/reset/:token', userController.resetPassword);

module.exports = router;
