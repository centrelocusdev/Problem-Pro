const router = require("express").Router();
const User = require("../models/userModal");
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const multer = require('multer');
// const upload = multer({ dest: 'uploads/' })


router.post('/register' , authController.register)
router.post('/login' , authController.login)
router.post('/update-profile',authController.getUserByToken,authController.updateProfile)
router.post('/logout' ,authController.getUserByToken ,authController.logout)
router.post('/forgot-password' ,authController.forgotPassword)
router.post('/reset-password' , authController.getUserByToken, authController.resetPassword)
router.post('/change-password' , authController.getUserByToken, authController.changePassword)
router.post('/delete-account', authController.deleteAccount)
router.post('/count-note',authController.countNote)
router.post('/reset-count-note', authController.resetCountNote)
router.post('/start-trial', authController.startTrial)
router.post('/add-subscriber', authController.addSubscriber)
router.post('/get-user-data' , authController.getUserByToken, userController.getUserData);
router.post('/contact' ,authController.contactUs)

module.exports = router; 