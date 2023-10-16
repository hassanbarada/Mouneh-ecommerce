const express = require("express");
const stripe = require('stripe')("sk_test_51Nc7uCEnoGOyJRYzRpf6Z26ESHovPTJb6I1GYOthmAQ1NBFs4LGE1FeQBA14KQFGWmp6FgUHAucfBZoSvAp0Qabq00A32ktnMR");
const flash = require('express-flash');
require("dotenv").config();
const session = require('express-session');
const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
  try {
    const myworkshop = req.body.workshop;
    if (myworkshop.capacity < 1) {
      console.log("Cant register");
      router.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
      router.use(flash());

    } else {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: myworkshop.title,
                description: myworkshop.description,
              },
              unit_amount: myworkshop.price * 100,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `http://localhost:3000/workshop/register-success/${myworkshop.capacity}/${myworkshop._id}`, // Replace with your success URL
        cancel_url: 'http://localhost:3000/workshops', // Replace with your cancel URL
      });

      console.log("Session created");
      res.send({ url: session.url });
    }
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({ error: 'An error occurred while creating the session.' });
  }
});

module.exports = router;
