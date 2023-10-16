import React,{useEffect, useState} from 'react';
import style from '../../../assets/css/Plans/success.module.css';
import Success from '../../../assets/images/payment/success.png';
import {auth} from '../../../request/auth';
// import {stripe} from '../../../request/stripe';
import { useNavigate } from "react-router-dom";
import RightBack from '../../../assets/images/payment/Chevron Right.png';


const SuccessStripe = () => {
  const [loading , setLoading] = useState(true);
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [sessionId, setSessionId]= useState("");
  

  
  return (
    <div>
        <div className={style.container}>
            <div className={style.click}>
              <h2 style={{color:"gray"}}>Your Payment has been done. Thank You for the Subscription!</h2>
              <img src={Success} alt="success"/>
              <div className={style.backBox}>
              <img src={RightBack} alt="right-back"/>
              <a style={{color: "#03256C", fontSize:20+ 'px'}} href="/plans">Back</a>
              </div>
          </div>
        </div>
    </div>
  )
}

export default SuccessStripe