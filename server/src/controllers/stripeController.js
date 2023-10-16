const router = require("express").Router();
var onHeaders = require('on-headers')

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../models/userModal");
const moment = require("moment");


const stripeCreateSession = async(planId)=> {
    try{
        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [
              {
                price: planId,
                quantity: 1,
              },
            ],
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
          });
          return session;
    }catch(err){
      res.status(400).send({ status: "error", message: err.message });
    }
}

exports.createSession = async (req, res) => {
  try {
    const _id = req.user._id;
    const plan = req.body.plan;
    
    if(plan == 0){
      const result = await User.updateOne({_id} , {
        $set: {
            subs_id: null,
            subs_plan:null,
            planType: 'free',
            planStartDate: null,
            planEndDate: null,
            planDuration: null
          
        }
      })

      res.status(200).json({
        status: "success",
        plan: "free-plan"
      })
    }else{
      let planId = null;
      if (plan == 399) planId = process.env.BASIC_PLAN;
      const session =  await stripeCreateSession(planId);
      const result = await User.updateOne({_id} , {
          $set: {
              subs_id: session.id,
          }
        })
        if(result.acknowledged){
          res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
          res.setHeader("Pragma", "no-cache");
          res.setHeader("Expires", 0);
          res.setHeader( "etag", false );
          res.removeHeader("etag");
          scrubETag(res)

          res.status(200).json({
              status: 'success',
              plan: 'basic-plan',
              data: session
          })
        }
    }
   
  } catch (err) {
    res.status(400).send({ status: "error", message: err.message });

  }
};

function scrubETag(res) {
  onHeaders(res, function () {
    this.removeHeader('etag')
  })
}
exports.paymentSuccess = async(req, res)=> {
  const sessionId= req.body.sessionId;
  const userId = req.user._id;
  // console.log("payment-success",sessionId, userId , req.body);
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      // console.log(session);
      if (session.payment_status === 'paid') {
          const subscriptionId = session.subscription;
          try {
            const subscription = await stripe.subscriptions.retrieve(subscriptionId);
            const user = await User.find({_id: userId});
            const planId = subscription.plan.id;
            const planType = "basic";
            const startDate = moment.unix(subscription.current_period_start).format('YYYY-MM-DD');
            const endDate = moment.unix(subscription.current_period_end).format('YYYY-MM-DD');
            const durationInSeconds = subscription.current_period_end - subscription.current_period_start;
            const durationInDays = moment.duration(durationInSeconds, 'seconds').asDays();
            const result = await User.updateOne({_id:userId} , {
              $set: {
                  subs_id: null,
                  subs_plan:planId,
                  planType: planType,
                  planStartDate: startDate,
                  planEndDate: endDate,
                  planDuration: durationInDays
                
              }
            })
            // console.log(result);
             
              
            } catch (error) {
              console.error('Error retrieving subscription:', error);
            }
          return res.json({ message: "Payment successful" });
        } else {
          return res.json({ message: "Payment failed" });
        }
      } catch (error) {
        res.status(400).send({ status: "error", message: err.message });
      }
}

const createPrice = async () => {
  try {
    const plan = "Premium";
    const product = await stripe.products.create({
      name: `NoteGenie ${plan}`,
    });

    if (product) {
      const price = await stripe.prices.create({
        unit_amount: 10.99 * 100,
        currency: "usd",
        product: product.id,
        recurring: { interval: "month" },
      });
    }
  } catch (err) {
    res.status(400).send({ status: "error", message: err.message });
  }
};

// createPrice()

router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency, description, customer, payment_method } =
      req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      description,
      customer,
      payment_method,
      payment_method_types: ["card"],
    });

    const { status, client_secret, id } = paymentIntent;
    res.send({
      status: "success",
      data: {
        status,
        client_secret,
        id,
      },
    });
  } catch (err) {
    res.status(500).send({ status: "error", message: err.message });
  }
});

router.post("/create-subscription", async (req, res) => {
  try {
    const { userId, plan } = req.body;
    const user = await User.findById(userId);

    let priceId;
    if (plan == "basic") priceId = process.env.BASIC_PRICE_ID;
    else if (plan == "premium") priceId = process.env.PREMIUM_PRICE_ID;
    else return;

    const subs = await stripe.subscriptions.create({
      customer: user.customer_id,
      items: [
        {
          price: priceId,
        },
      ],
      payment_behavior: "default_incomplete",
      expand: ["latest_invoice.payment_intent"],
    });

    res.status(200).send({
      status: "success",
      message: "subscription created successfully",
      data: {
        subsId: subs.id,
        clientSecret: subs.latest_invoice.payment_intent.client_secret,
      },
    });
  } catch (err) {
    res.status(500).send({ status: "error", message: err.message });
  }
});

router.post("/subscription", async (req, res) => {
  try {
    const { subsId } = req.body;
    const subs = await stripe.subscriptions.retrieve(subsId);
    res.status(200).send({ status: "success", data: subs });
  } catch (err) {
    res.status(500).send({ status: "error", message: err.message });
  }
});

router.post("/cancel-subscription", async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    const subs = await stripe.subscriptions.cancel(user.subs_id);

    user.subs_status = subs.status;
    await user.save();
    res
      .status(200)
      .send({
        status: "success",
        message: "Your subscription has been canceled",
      });
  } catch (err) {
    res.status(500).send({ status: "error", message: err.message });
  }
});

router.post("/update-subs-status", async (req, res) => {
  try {
    const { userId, plan, subsId } = req.body;
    const user = await User.findById(userId);

    const subs = await stripe.subscriptions.retrieve(subsId);

    user.subs_id = subs.id;
    user.subs_plan = plan;
    user.subs_status = subs.status;
    user.trial = false;
    user.subs_started_at = new Date(subs.created * 1000);
    await user.save();
    res
      .status(200)
      .send({ status: "success", message: "user subscription updated" });
  } catch (err) {
    res.status(500).send({ status: "error", message: err.message });
  }
});

router.post("/attach-payment-method", async (req, res) => {
  try {
    const { userId, paymentMethodId } = req.body;
    const user = await User.findById(userId);
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: user.customer_id,
    });

    await stripe.customers.update(user.customer_id, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    res.status(200).send({
      status: "success",
      message: "payment method has been attached successfully",
    });
  } catch (err) {
    res.status(500).send({ status: "error", message: err.message });
  }
});

const cancelSubs = async () => {
  const subs = await stripe.subscriptions.retrieve(
    "sub_1NJCBMHDuMBRsT9C9i233VjA"
  );
};

// cancelSubs()
