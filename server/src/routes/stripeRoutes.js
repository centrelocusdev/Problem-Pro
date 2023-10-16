const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser')
const stripeController2 = require('../controllers/stripeController2');
const authController = require('../controllers/authController');


router.get('/createProductAndPrice' , stripeController2.createProductAndPrice);
router.post('/create-subscription', stripeController2.createCheckoutSession);
router.post('/getUserSubscriptionData' , authController.getUserByToken , stripeController2.getUserSubscriptionData);
router.post('/create-CustomerPortal-Session' , authController.getUserByToken, stripeController2.createCustomerPortal);
// router.post('/payment-success' , authController.getUserByToken, stripeController2.paymentSuccess);

module.exports = router; 