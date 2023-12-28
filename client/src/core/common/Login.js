import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import background from "./../../assets/images/common/loginbackground.png";
import email from "./../../assets/images/common/Layer 2.png";
import password from "./../../assets/images/common/Vector (1).png";
import { useNavigate } from "react-router-dom";
import { auth } from "../../request/auth";
import { useMutation } from "react-query";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { device } from "../../assets/css/mediaQueries";
import ClipLoader from "react-spinners/ClipLoader";



export default function Login({ loggedIn }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // const {isLoading, error, data,mutate} = useMutation("login",auth.loginUser,{
  //     onSuccess:(res)=>{
  //         if(res.message === true){
  //             localStorage.setItem("token", res.token)
  //             navigate("/dashboard")
  //         }else{
  //             alert(res);
  //         }
  //     },
  //     onError:(err)=>{
  //       alert("err", err)
  //     }
  //   })

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await auth.loginUser(formData);

      // alert(res.data.message);
      if (res && res.data.status === 'success') {
        setLoading(false);
        toast.success(res.data.message);
        localStorage.setItem("token", res.data.data.token);
        navigate("/dashboard");
      } else {
        setFormData({
            email: "",
            password: "",
          });
          setLoading(false);
          toast.error("something went wrong!");
      }
    } catch (error) {
      if(error && error.response && error.response.data){
        const { message } = error.response.data;
        toast.error(message);
  
      }else{
        toast.error("Something went wrong!");
      }
      return;
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
        <h1>Log In</h1>
        <div className="wrapper">
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
          <a onClick={()=> {navigate("/forgot-password")}} className="forget">Forget password?</a>
          <button type="submit" className="btn-2">
          {loading ? (
                <div className="loader-box">
                  Logging In..
                  <ClipLoader size={20} color="#03256C" />
                </div>
              ) : (
                "Log In"
              )}
          </button>
          <div className="login">
            <span>Don't have an account?</span>
            <NavLink to="/signup">Signup</NavLink>
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
  background-size: cover;
  .body {
    max-width: 600px;
    /* min-width: 30vw; */
    width:480px;
    margin: auto;
    border-radius: 10px;
    padding: 40px;
    background: #5A60F1;

h1 {
      text-align: center;
      color: white;
      font-weight: 800 !important;
      margin-bottom: 10px;
    }
    .wrapper {
      display: flex;
      flex-direction: column;
      align-items:center;
      gap: 20px;
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
      align-self:flex-end;
    }
    // .btn{
    //   width:35%;
    // }
    .login {
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
