import React, { useState } from "react";
import { styled } from "styled-components";
import background from "../../../assets/images/common/loginbackground.png";
// import { useMutation } from 'react-query'
// import { auth } from '../../request/auth'
// import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import back from "./../../../assets/images/common/Chevron Right.png"
import { extraRequests } from "../../../request/extraRequests";
import contactUs from "../../../assets/images/homepage/contact-us.png";
import { device } from "../../../assets/css/mediaQueries";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    message: "",
  });
  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const res = await extraRequests.contactUs(formData);
      if (res) {
        toast.success(res);
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          phone_number: "",
          message: "",
        });
      }
    } catch (err) {
      console.log("Error", err);
    }
  };
  const onChangeHandler = async (e) => {
    setFormData(() => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Wrapper onSubmit={submitHandler}>
      <div className="body">
        <div className="left">
          <NavLink to="/">
            <div className="btn-back">
              <img src={back} alt="back button" />
              <span className="backButton">Back</span>
            </div>
          </NavLink>
          <img className="contact-image" src={contactUs} alt="contact-us"/>
        </div>
        <div className="right">
          {/* <h1>Contact Us</h1> */}
          <div className="wrapper">
            <div className="first">
            <div className="input-label-wrapper">
              <label>First Name</label>
              <div className="input-wrapper">
                <input
                  value={formData.first_name}
                  onChange={onChangeHandler}
                  name="first_name"
                  type="text"
                />
              </div>
            </div>
            <div className="input-label-wrapper">
              <label>Last Name</label>
              <div className="input-wrapper">
                <input
                  value={formData.last_name}
                  onChange={onChangeHandler}
                  name="last_name"
                  type="text"
                />
              </div>
            </div>
            </div>
           
           <div className="second">
           <div className="input-label-wrapper">
              <label>Email</label>
              <div className="input-wrapper">
                <input
                  value={formData.email}
                  onChange={onChangeHandler}
                  name="email"
                  type="email"
                />
              </div>
            </div>
            <div className="input-label-wrapper">
              <label>Phone Number</label>
              <div className="input-wrapper">
                <input
                  value={formData.phone_number}
                  onChange={onChangeHandler}
                  name="phone_number"
                  type="number"
                />
              </div>
            </div>
           </div>
           
            <div className="input-label-wrapper">
              <label>Message</label>
              <div className="input-wrapper">
                <input
                  value={formData.message}
                  onChange={onChangeHandler}
                  name="message"
                  type="text"
                />
              </div>
            </div>
            <button onClick={submitHandler} type="submit" className="btn contact-btn">
              Send
            </button>
          </div>
        </div>

        <ToastContainer />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.form`
  position: relative;
  background: linear-gradient(180deg, #ffcdea 0%, #fff 100%);
  padding-top: 110px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  .btn-back {
    margin-bottom: 10px;
    color: black;
  }
  .btn-back img {
    height: 20px;
    width: 20px;
    margin-right: 5px;
  }
  .backButton {
    color: #03256C;
font-family: Inter;
font-size: 30px;
font-style: normal;
font-weight: 600;
line-height: normal;
text-transform: capitalize;
    
  }
  .body {
    /* max-width: 900px; */
    width:70%;
    margin: auto;
    padding: 20px;
    background-color: white;
    color: #03256c;
    display:flex;
    justify-content:center;
    align-items:center;
    gap:10px;
    border-radius: 20px;
    background: #FFF;
    box-shadow: 0px 4px 4px 0px #03256C;
    :h1  {
      text-align: center;
      color: white;
      font-weight: 800 !important;
      margin-bottom: 10px;
    }
    .left{
        width:50%;
        .contact-image{
          width:400px;
          height:400px;
        }
    }
    .right{
        width:50%;
        padding:20px;
        .wrapper {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .first{
        display:flex;
        gap:30px;
      }
      .second{
        display:flex;
        gap:30px;
      }
      .btn{
            font-size:20px;
            align-self:center;
          }
      .input-label-wrapper {
        display: flex;
        flex-direction: column;
        gap: 10px;
        label {
            color: #03256C;
            font-family: Poppins;
            font-size: 12px;
            font-style: normal;
            font-weight: 500;
            line-height: 20px; /* 166.667% */
        }
        .input-wrapper {
          display: flex;
          flex-direction: row;
          gap: 10px;
          /* padding: 10px; */
          /* border-radius: 10px; */
          border-bottom: 1px solid #03256C;
;
          position: relative;
          img {
            position: relative;
          }
          hr {
            background-color: black;
            border: none;
            width: 2px;
            border-radius: 2px;
          }

          input {
            border: none;
            outline: none;
            font-size: 18px;
            font-family: Poppins;
            width:90%;


          }
          
        }
      }
    }

    }
      }
      @media ${device.laptop}{
        .body{
          .left{
            .contact-image{
              width:280px;
              height:280px;
        }
          }
        }
      }
      @media ${device.tablet}{
        .body{
          flex-direction:column;
          align-items:center;
          justify-content:center;
          .left{
            width:100%;
            display:flex;
            justify-content:center;
            flex-direction:column;
            .contact-image{
              width:250px;
              height:250px;
              align-self:center;
        }
          }
          .right{
            width:100%;
          }
        }
      }
      @media ${device.mobileL}{
        .body{
          .right{
            .wrapper{
              .first{
                flex-direction:column;
              }
              .second{
                flex-direction:column;
              }
            }
          }
        }
      }
      @media ${device.mobileS}{
        .btn-back img {
          height: 10px;
          width: 10px;
        }
        .backButton {
          font-size: 20px;    
        }
        .body{
          .left{
            .contact-image{
              width:200px;
              height:200px;
        }
          }
        }
      }

`;
