const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/forgotPassword', authController.forgotPassword);
// You will also need this one later to handle the actual reset:
// router.patch('/resetPassword/:token', authController.resetPassword);

module.exports = router;