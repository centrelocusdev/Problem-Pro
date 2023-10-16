const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../models/userModal");
const moment = require("moment");
const nodemailer = require("nodemailer");

// Step 1: Create Product and Price
const creationOfProductAndPrice = async (plan, amount) => {
  try {
    stripe.products
      .create({
        name: `Problem Pro ${plan}`,
        description: plan,
      })
      .then((product) => {
        stripe.prices
          .create({
            unit_amount: amount * 100,
            currency: "usd",
            recurring: {
              interval: "month",
            },
            product: product.id,
          })
          .then((price) => {
            console.log('Plan'+ plan + 'Success! Here is your starter subscription product id: ' + product.id);
            console.log('Plan'+ plan + 'Success! Here is your premium subscription price id: ' + price.id);
            return { productId: product.id, priceId: price.id };
          });
      });
  } catch (err) {
    console.log(err);
  }
};
// Step2: Create a Checkout session for free trial
const createSessionBasicTrial = async (priceId) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_settings: {
          end_behavior: {
            missing_payment_method: "pause",
          },
        },
        trial_period_days: 1,
      },
      // payment_method_collection: 'if_required',
      // customer_creation: "if_required",
      // success_url:
        // "http://localhost:8000/success?session_id={CHECKOUT_SESSION_ID}",
      // cancel_url: "http://localhost:8000/cancel",
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });
    return session;
  } catch (err) {
    console.log(err);
  }
};

const createSessionBasicPro = async (priceId) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      // payment_method_collection: 'if_required',
      // customer_creation: "if_required",
      // success_url:
        // "http://localhost:8000/success?session_id={CHECKOUT_SESSION_ID}",
      // cancel_url: "http://localhost:8000/cancel",
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });
    return session;
  } catch (err) {
    console.log(err);
  }
};
// Step2: Create a Checkout Session
const createSessionPremium = async (priceId) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      // customer_creation: "if_required",
      // success_url:
        // "http://localhost:8000/success?session_id={CHECKOUT_SESSION_ID}",
      // cancel_url: "http://localhost:8000/cancel",
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });
    return session;
  } catch (err) {
    console.log(err);
  }
};
exports.createProductAndPrice = async (req, res) => {
  // Step1: Create Product and Price
  // const productAndPriceBasic = await creationOfProductAndPrice("Basic", 10);
  const productAndPricePremium = await creationOfProductAndPrice("Premium A", 15);
  // console.log(productAndPrice.productId, productAndPrice.priceId);
  res.send("success");
};

exports.createCheckoutSession = async (req, res) => {
  // Step2: Create a Checkout Session
  console.log(req.body);
  const user = req.user;
  const isTrialActive = req.body.isTrialActive;
  const priceType = req.body.priceType;
  let session;
  if (priceType === "Basic" && isTrialActive !== "cancel") {
    session = await createSessionBasicTrial(process.env.BASIC_PRICE_ID);
  }else if(priceType === "Basic" && isTrialActive === "cancel"){
    session = await createSessionBasicPro(process.env.BASIC_PRICE_ID);
  } else if (priceType === "Premium") {
    session = await createSessionPremium(process.env.PREMIUM_PRICE_ID);
  }
  // session = await createSession();

  res.send({ url: session.url });
};

exports.handleWebhook = async (req, res) => {
  try {
    let data;
    let eventType;
    let event;

    // Check if webhook signing is configured.

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (webhookSecret) {
      let signature = req.headers["stripe-signature"];
      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          webhookSecret
        );
      } catch (err) {
        // console.log(err);
        // console.log(`⚠️  Webhook signature verification failed.`);
        return res.status(400).json({
          status: "fail",
          message: "⚠️  Webhook signature verification failed.",
          data: err,
        });
      }
      eventType = event.type;
    } else {
      data = req.body.data;
      eventType = req.body.type;
    }
    let details = null;
    let customer = null;
    let customerDetails = null;
    let subscriptionId = null;
    let subscription = null;
    let user = null;
    let subs_plan_id= null;
    let subs_status = null;
    let trial_start = null;
    let trial_end = null;
    let startDate = null;
    let endDate = null;
    let durationInDays = null;
    let durationInSeconds = null;
    let trial_status = null;
    details = event.data.object;
    customer = details.customer;
    customerDetails = await stripe.customers.retrieve(customer);
    user = await User.findOne({ email: customerDetails.email });

    if (
      eventType === "checkout.session.completed" ||
      eventType === "invoice.payment_succeeded"
    ) {
      subscriptionId = details.subscription;
      subscription = await stripe.subscriptions.retrieve(subscriptionId);
      subs_plan_id= subscription.plan.id;
      durationInSeconds =
      subscription.current_period_end - subscription.current_period_start;
      durationInDays = moment.duration(durationInSeconds, "seconds").asDays();
      if (subscription.status === "trialing") {
        trial_start = moment
        .unix(subscription.trial_start)
        .format("YYYY-MM-DD");
        trial_end = new Date(subscription.trial_end * 1000);
        durationInDays = null;
        trial_status = 'active';
        subs_status = null;
      } else if (subscription.status === "active") {
        startDate = moment
        .unix(subscription.current_period_start)
        .format("YYYY-MM-DD");
        endDate = new Date(subscription.current_period_end * 1000);
        subs_status = subscription.status;
        trial_status = null;
      }
    }
    switch (eventType) {
      case "checkout.session.completed":
        const saveData = await saveWebhooksDataToDbForNew(user, customer, subscriptionId, subs_plan_id, startDate, endDate,subs_status, trial_start, trial_end, durationInDays, trial_status);
        if(saveData){
        }
        break;
      // case "invoice.payment_succeeded":
      //   const savedData = await saveWebhooksDataToDbForNew(user, customer, subscriptionId, subs_plan_id, startDate, endDate,subs_status, trial_start, trial_end, durationInDays , trial_status);
      //   if(savedData){
      //   }
      //   break;
      case "invoice.payment_failed":
        // console.log("payment failed");
        // The payment failed or the customer does not have a valid payment method.
        // The subscription becomes past_due. Notify your customer and send them to the
        // customer portal to update their payment information.
        break;
      case "payment_intent.succeeded":
        // console.log("in the payment intent succeeded");
        // client_secret
        // customer
        // const paymentIntentSucceeded = event.data.object;
        // console.log(paymentIntentSucceeded);

        break;
      case "charge.succeeded":
        // I read this that this event is usefull to handle recurring payment notification
        // event => data => charge object

        break;

      case "customer.subscription.trial_will_end":
        const customerId = event.data.object.customer;
        const customerDetails = await stripe.customers.retrieve(customer);
        user = await User.findOne({ email: customerDetails.email });
        const isEmailSent = await sendEmail(user.email);
        break;

      case "customer.subscription.updated":
        const eventData = event.data.object;
        if (eventData.canceled_at !== null && eventData.status === 'trialing' ) {
            trial_status = "cancel";
            subs_status = null;
            const saveData = await saveWebhooksDataToDbForUpdate(user, customer,subs_plan_id, startDate, endDate,subs_status, trial_start, trial_end, durationInDays ,trial_status);
            if(saveData){
              // console.log(saveData);
            }
        }else if(eventData.canceled_at !== null && eventData.status === 'active'){
          subs_status = "cancel";
          trial_status = null;
          subs_plan_id = eventData.plan.id;
          startDate = moment
          .unix(eventData.current_period_start)
          .format("YYYY-MM-DD");
          endDate = new Date(eventData.current_period_end * 1000);
          const saveData = await saveWebhooksDataToDbForUpdate(user, customer,eventData.plan.id, startDate, endDate,subs_status, trial_start, trial_end, durationInDays ,trial_status);

        } else if (
          eventData.canceled_at === null &&
          eventData.status === "trialing"
        ) {
           subs_plan_id = eventData.plan.id;
           subs_status= null;
           trial_status = "active";
           trial_start = moment
          .unix(eventData.trial_start)
          .format("YYYY-MM-DD");
        trial_end = new Date(eventData.trial_end * 1000);
          const result = await saveWebhooksDataToDbForUpdate(user, customer, subs_plan_id, startDate, endDate,subs_status, trial_start, trial_end, durationInDays, trial_status);
          if(result){
          }          
        }else if(eventData.canceled_at === null &&
          eventData.status === "active"){
            subs_plan_id = eventData.plan.id;
            subs_status= eventData.status;
            trial_status = null;
            trial_start = null;
            trial_end = null;
            startDate = moment
          .unix(eventData.current_period_start)
          .format("YYYY-MM-DD");
          endDate = new Date(eventData.current_period_end * 1000);
            const result = await saveWebhooksDataToDbForUpdate(user, customer,subs_plan_id, startDate, endDate,subs_status, trial_start, trial_end, durationInDays);
            if(result){
              // console.log(result);
            }   
          }

        break;
      case "customer.subscription.paused":
        // agar free trial end hone se pehle payment nahi hua to

        break;
      case "customer.subscription.resumed":
        // agar subscription pause ho gaya tha and ab vapis resume houa hai

        break;
      default:
        return res.status(400).end();
      // Unhandled event type
    }

    res.sendStatus(200);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getUserSubscriptionData = async (req, res) => {
  try {
    const user = req.user;
    if (!user) throw new Error("User now found!");
    let isTrialActive = null;
    if(user.trial_status === 'active' && new Date(user.trial_end) > Date.now()){
      isTrialActive = true;
    }else if(user.trial_status === 'cancel' || new Date(user.trial_end) < Date.now()){
      isTrialActive = false;
    }
    let isSubscriptionActive= null;
    if(user.subs_plan_id && user.planEndDate && user.subs_status === 'active' && new Date(user.planEndDate) > Date.now()){
      isSubscriptionActive = true;
    }else if(user.subs_status === 'cancel' || new Date(user.planEndDate) < Date.now()){
      isSubscriptionActive = false;
    }
    
       const data = {
      stripeSubscriptionId: user.subs_id,
      stripeCurrentPeriodEnd: user.planEndDate,
      stripeCurrentTrialEnd: user.trial_end,
      stripeCustomerId: user.customer_id,
      stripeSubscriptionPlanId: user.subs_plan_id,
      isTrialActive,
      isSubscriptionActive,
    };

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    console.log(err);
  }
};

const sendEmail = async (email) => {
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });
    var mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: "Problemo Pro Free Trial Ending Reminder",
      text: "This is a friendly reminder that your free trial for [Product/Service Name] is ending in just 3 days. Please be prepared for the transition, as the subscription fee will be charged shortly. If you have any questions or need assistance, feel free to reach out to us.",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return;
      }
      return true;
    });
  } catch (err) {
    console.log("Error", err);
  }
};

// Configration of customer portal
exports.createCustomerPortal = async (req, res) => {
  const user = req.user;
  const CUSTOMER_ID = user.customer_id;
  let session = await stripe.billingPortal.sessions.create({
    customer: CUSTOMER_ID,
    return_url: `${process.env.FRONTEND_URL}/plans`,

  });
  res.status(200).json({
    status: "success",
    url: session.url,
  });
};


const saveWebhooksDataToDbForNew = async(user, customer, subscriptionId, subs_plan_id, startDate, endDate,subs_status, trial_start, trial_end, durationInDays, trial_status)=> {
  try{
  // if(!user)return;
  if (user) {
    const result = await User.updateOne(
      { _id: user._id },
      {
        $set: {
          customer_id: customer,
          subs_id: subscriptionId,
          subs_plan_id: subs_plan_id,
          planStartDate: startDate,
          planEndDate: endDate,
          subs_status: subs_status,
          trial_start: trial_start,
          trial_end: trial_end,
          planDuration: durationInDays,
          trial_status: trial_status,
        },
      }
    );
    if(result.acknowledged){
      return "Data Saved in db successfully!"
    }else {
      return "Something went wrong!"
    }
  }
}catch(err){
console.log(err.message);
// return err.message;
} 
}

const saveWebhooksDataToDbForUpdate = async(user, customer,subs_plan_id, startDate, endDate,subs_status, trial_start, trial_end, durationInDays , trial_status)=> {
    try{
    // if(!user)return;
    if (user) {
      const result = await User.updateOne(
        { _id: user._id },
        {
          $set: {
            customer_id: customer,
            subs_plan_id: subs_plan_id,
            planStartDate: startDate,
            planEndDate: endDate,
            subs_status: subs_status,
            trial_start: trial_start,
            trial_end: trial_end,
            planDuration: durationInDays,
            trial_status: trial_status
          },
        }
      );
      if(result.acknowledged){
        return "Data Saved in db successfully!"
      }else {
        return "Something went wrong!"
      }
    }
  }catch(err){
  console.log(err.message);
  // return err.message;
  } 
  }