import { styled } from "styled-components";
import background from "./../../assets/images/common/loginbackground.png";
import user from "./../../assets/images/common/User.png";
import email from "./../../assets/images/common/Layer 2.png";
import password from "./../../assets/images/common/Vector (1).png";
import { useMutation } from "react-query";
import { auth } from "../../request/auth";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { device } from "../../assets/css/mediaQueries";
import ClipLoader from "react-spinners/ClipLoader";


export default function Signup() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // const {isLoading, error, data,mutate} =useMutation("register",auth.registerUser,{
  //     onSuccess:(res)=>{
  //       if(res.data.status === 'success'){
  //           alert('Signup Successful');
  //           localStorage.setItem("token",res?.data?.data?.token)
  //           navigate("/dashboard")
  //       }else{
  //         alert(res.data.message);
  //         navigate("/Login");
  //       }

  //     },
  //     onError:()=>{
  //       alert("Something is wrong ")
  //     }
  //   })

  //   const submitHandler=(e)=>{
  //     e.preventDefault()
  //       console.log("e.target", e.target);
  //     const payload = new FormData(e.target)
  //     mutate(payload);
  //   }

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const res = await auth.registerUser(formData);
      if(res){
        setLoading(false);
        toast(res.data.message);
        // alert(res.data.message);
        navigate('/dashboard');
        if (res.data.status === 'success') {
          localStorage.setItem("token", res.data.data.token);
          navigate("/dashboard");
        } else {
          setFormData({
              name: "",
              email: "",
              password: "",
            });
        }
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
  useEffect(() => {
  }, [formData]);

  return (
    <Wrapper onSubmit={submitHandler}>
      <div className="body">
        <h1>Sign Up</h1>
        <div className="wrapper">
          <div className="input-label-wrapper">
            <label>Name</label>
            <div className="input-wrapper">
              <img src={user} alt="" />
              <hr />
              <input
                value={formData.name}
                onChange={onChangeHandler}
                name="name"
                type="text"
                placeholder="Enter Your Name"
                required
              />
            </div>
          </div>
          <div className="input-label-wrapper">
            <label>Email</label>
            <div className="input-wrapper">
              <img src={email} alt="" />
              <hr />
              <input
                value={formData.email}
                onChange={onChangeHandler}
                name="email"
                type="email"
                placeholder="Enter Your Email"
                required

              />
            </div>
          </div>
          <div className="input-label-wrapper">
            <label>Password</label>
            <div className="input-wrapper">
              <img src={password} alt="" />
              <hr />
              <input
                value={formData.password}
                onChange={onChangeHandler}
                name="password"
                type="password"
                placeholder="Enter Your Password"
                required

              />
            </div>
          </div>
          <button type="submit" className="btn-2">
          {loading ? (
                <div className="loader-box">
                  Signing In..
                  <ClipLoader size={20} color="#03256C" />
                </div>
              ) : (
                "Sign In"
              )}
          </button>
          <div className="signup">
            <span>Already have an account?</span>
            <NavLink to="/login">Login</NavLink>
          </div>
        </div>
      
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.form`
  position: relative;
  background: linear-gradient(180deg, #FFCDEA 0%, #FFF 100%);
  padding-top: 92px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .body {
    max-width: 550px;
    /* min-width: 30vw; */
    width:480px;
    margin: 20px auto;
    border-radius: 10px;
    padding: 40px;
    background: #5A60F1;
/* background-image: linear-gradient(to bottom, #79dbee, #10b0da); */
    h1 {
      text-align: center;
      color: white;
      font-weight: 800 !important;
      margin-bottom: 10px;
    }
    .wrapper {
      display: flex;
      flex-direction: column;
      gap: 20px;
      align-items: center;

      .input-label-wrapper {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width:100%;
        label {
          color: white;
        }
        .input-wrapper {
          display: flex;
          flex-direction: row;
          gap: 10px;
          padding: 10px;
          border-radius: 10px;
          border: 4px solid white;
          position: relative;
          background-color: #fff;
          img {
            position: relative;
          }
          hr {
            background-color: black;
            color: black;
            border: none;
            width: 2px;
            border-radius: 2px;
          }

          input {
            border: none;
            outline: none;
            background-color: inherit;
            font-size: 18px;
            width:100%;
          }
        }
      }
    }
    .forget {
      text-align: right;
      color: white;
    }
    /* .btn{
        width:38%;
      } */
    .signup {
      text-align: center;
      span {
        color: white;
        margin-right: 5px;
        font-size: 16px;
        font-weight: 400;
      }
      a {
        color: #000000;
        font-size: 18px;
        font-weight: 400;
      }
      
    }
  }
  @media ${device.laptop}{
    .body{
      width:400px;
    }
  }
  @media ${device.tablet}{
    .body{
      width:350px;
    }
  }
  @media ${device.mobileM}{
    .body{
      width: 300px;
      padding:5px;
      margin: auto 0;
      .wrapper{
        .input-label-wrapper{
          .input-wrapper{
            padding:0;
            input{
            font-size:12px;
            }
          }
        }
       
      }
     
      
    }
  }

`;
