// const {axios} = require('axios');
import axios from "axios";
// const {axios} = require('axios');
//const Backend_URL = process.env.REACT_APP_BACKEND_URL;

const Backend_URL = "https://problem-pro.onrender.com";

const stripeCheckout2 = async (priceType , isTrialActive) => {
  try {
    const res = await axios.post(`${Backend_URL}/create-subscription`, {
      token: localStorage.getItem("token"),
      priceType: priceType,
      isTrialActive,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};



const getUserSubscriptionPlan = async () => {
  try {
    const res = await axios.post(`${Backend_URL}/getUserSubscriptionData`, {
      token: localStorage.getItem("token"),
    });
    if(res && res.data && res.data.data){
      // console.log(res);
      return res.data.data;
    }
  } catch (err) {
    console.log(err);
  }
};

const createCustomPortalSession= async()=> {
const res = await axios.post(`${Backend_URL}/create-CustomerPortal-Session` , {
  "token": localStorage.getItem("token")
});
if(res && res.data){
  return res.data.url;
}
}
export const stripe = {
  stripeCheckout2,
  getUserSubscriptionPlan,
  createCustomPortalSession,
};
