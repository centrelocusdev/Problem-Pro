const express = require('express');
const router = express.Router();
const chatGPTController = require('../controllers/chatgptController');
const authController = require('../controllers/authController');

router.post('/get-questions' , authController.getUserByToken,  chatGPTController.getUserQuestions);
router.post('/create-question' , authController.getUserByToken, chatGPTController.createQuestions);
router.post('/get-question' ,authController.getUserByToken, chatGPTController.getUserQuestion);


module.exports = router;
