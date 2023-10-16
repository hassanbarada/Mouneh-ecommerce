const { Router } = require('express');
const express=require('express');
const {HandleStripe,handleStripeWebhook}=require('../Controllers/Stripe');
const router = Router();

router.post('/create-checkout-session',HandleStripe);
router.post('/webhook', express.raw({type: 'application/json'}),handleStripeWebhook);
module.exports = router;