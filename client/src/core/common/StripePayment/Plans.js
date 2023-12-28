import React, { useEffect, useState } from "react";
import style from "../../../assets/css/Plans/plans.module.css";
import { stripe } from "../../../request/stripe";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../request/auth";
import { NavLink } from "react-router-dom";
import back from "../../../assets/images/common/back-arrow.svg";
import background from "../../../assets/images/common/loginbackground.png";
import { styled } from "styled-components";
import manageSubscriptionButton from "./manageSubscriptionButton";
import Trial from "../../../assets/images/payment/Trial.png";
import Popular from "../../../assets/images/payment/Popular.png";

// const stripe = require('../../../request/stripe');

const Plans = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const numberOfCards = [
    {
      tag: "TRIAL",
      tagPro: "POPULAR",
      priceType: "Free",
      priceTypePro: "Basic",
      price: "$0",
      pricePro: "$15",
      about:
        "Free 7 days trial and then $15 per month to get an awesome experience about Problem Pro. You can search any questions with the help of AI and see the magic.",
      aboutPro:
        "In this plan you get an awesome experience about Problem Pro. You can search any questions with the help of AI and see the magic.",
      buttonTypeTry: "Try Now",
      buttonTypePro: "Buy Now",
      stripePriceId: "price_1O0dtSHGJUSpuNXr27vESIZb",
      img: Trial,
    },
    {
      tag: "MOST POPULAR",
      tagPro: "MOST POPULAR",
      priceType: "Premium",
      priceTypePro: "Premium",
      price: "$15",
      pricePro: "$15",
      about:
        "Go premium for $15 per month, to enjoy uninterrupted services of your personalized practice materials for students.",
      aboutPro:
        "Go premium for $15 per month, to enjoy uninterrupted services of your personalized practice materials for students.",
      buttonTypeTry: "Buy Now",
      buttonTypePro: "Buy Now",
      stripePriceId: "price_1O01YcHGJUSpuNXrl2A9XFyb",
      img: Popular,
    },
  ];
  const submitHandler = async (e, priceType) => {
    try {
      e.preventDefault();
      if (localStorage.getItem("token") === null) {
        navigate("/login");
      } else {
        if (
          userData &&
          userData.isTrialActive === false &&
          priceType !== "Premium"
        ) {
          const res = await stripe.stripeCheckout2(priceType, "cancel");
          if (res) {
            window.location.href = res.data.url;
            // history.push(res.data.url);
          } else {
            navigate("/");
          }
        } else {
          const res = await stripe.stripeCheckout2(priceType, "");
          if (res) {
            window.location.href = res.data.url;
            // history.push(res.data.url);c
          } else {
            navigate("/");
          }
        }
      }
    } catch (err) {
      console.log("Error", err);
    }
  };

  const fetchUserData = async () => {
    try {
      const data = await stripe.getUserSubscriptionPlan();
      if (data) {
        setUserData(data);
        console.log(data);
      }
    } catch (err) {
      console.log("Error", err);
    }
  };

  const manageSubscription = async (e) => {
    e.preventDefault();
    const url = await stripe.createCustomPortalSession();
    if (url) {
      window.location.href = url;
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <Wrapper>
      <p>hello</p>
      <div className={style.container}>
        <NavLink to="/">
          <div className={style.btnBack}>
            <img src={back} alt="back button" />
            <span className={style.backButton}>Back</span>
          </div>
        </NavLink>
        <div className={style.containerInner}>
          {numberOfCards.map((item) => {
            return (
              <div key={item.tag} className={style.planCard}>
                <p className={style.cardHeading}>
                  {!userData ||
                  (userData && userData.isTrialActive === null) ||
                  userData.isTrialActive === true
                    ? item.tag
                    : item.tagPro}
                </p>
                <p className={style.cardHeading}>
                  {!userData ||
                  (userData && userData.isTrialActive === null) ||
                  userData.isTrialActive === true
                    ? item.priceType
                    : item.priceTypePro}
                </p>
                <p className={style.cardHeading}>
                  {!userData ||
                  (userData && userData.isTrialActive === null) ||
                  userData.isTrialActive === true
                    ? item.price
                    : item.pricePro}
                </p>
                <p className={style.cardHeading}>
                  {!userData ||
                  (userData && userData.isTrialActive === null) ||
                  userData.isTrialActive === true
                    ? item.about
                    : item.aboutPro}
                </p>
                {userData !== null &&
                userData.stripeSubscriptionPlanId === item.stripePriceId ? (
                  <button
                    onClick={(e) => {
                      manageSubscription(e);
                    }}
                    className={style.subscribed}
                  >
                    Manage Subscription
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      submitHandler(e, item.priceTypePro);
                    }}
                    className={style.buyButton}
                  >
                    {!userData ||
                    (userData && userData.isTrialActive === null) ||
                    userData.isTrialActive === true
                      ? item.buttonTypeTry
                      : item.buttonTypePro}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.form`
  background: linear-gradient(180deg, #ffcdea 0%, #fff 100%);
`;

export default Plans;
