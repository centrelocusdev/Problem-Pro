import React from 'react';
import style from '../../../assets/css/Plans/cancel.module.css';
import Cancel from '../../../assets/images/payment/cancel.png';
import { NavLink } from 'react-router-dom';


const CancelStripe = () => {
  return (
    <div>
        <div className={style.container}>
            <img src={Cancel} alt="cross"/>
            <p>Something weng wrong!</p>
            <NavLink to="/">
            <button style={{margin: "auto", marginTop: "20px"}} className='primary-btn'>GO TO HOMEPAGE</button>
            </NavLink>
        </div>
    </div>
  )
}

export default CancelStripe