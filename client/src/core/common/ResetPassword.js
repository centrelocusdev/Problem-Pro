import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import profile from "../../assets/images/dashboard/Frame 3842.png"
import {auth} from '../../request/auth';
import { Link, useNavigate, useParams } from "react-router-dom";
import { device } from '../../assets/css/mediaQueries';

export default function Index() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        newPassword: "",
        otp:"",
        email: ""
    })
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const res = await auth.resetPassword(formData.newPassword , formData.otp , formData.email);
        if(res){
        navigate('/login');
        }
    }
    const onChangeHandler = async(e) => {
        setFormData(()=> ({
            ...formData,
            [e.target.name]: e.target.value
        }))
    }
  return (
    <Wrapper>
        <Link to="/">Change Password</Link>
        <div className="body">
            <img src={profile} alt="" />
            <div className="wrapper">
                <form onSubmit={onSubmitHandler}>
                
                <div className="input-label-wrapper">
                        <label>Enter Email Id</label>
                        <div className="input-wrapper">
                        <input onChange={onChangeHandler} value={formData.email} name="email" type="email" placeholder='Enter Email Id' />
                        </div>
                        <label>New Password</label>
                        <div className="input-wrapper">
                        <input onChange={onChangeHandler} value={formData.newPassword} name="newPassword" type="text" placeholder='Enter New Password' />
                        </div>
                        <label>OTP</label>
                        <div className="input-wrapper">
                        <input onChange={onChangeHandler} value={formData.otp} name="otp" type="text" placeholder='Enter OTP' />
                        </div>
                </div>
                <button className='btn primary-btn'>Reset Password</button>
                </form>
            </div>
            


        </div>
        
    </Wrapper>
  )
}


const Wrapper=styled.div`
background: linear-gradient(180deg, #FFCDEA 0%, #FFF 100%);
width:100vw;
height:100vh;
display: flex;
flex-direction: column;
justify-content:center;
align-items:center;
margin: 50px auto 20px auto;
gap: 24px;
a{
    color: #03256C;
    font-weight:700;    
    font-size: 26px;
    text-transform: capitalize;
}

.body{
    display: flex;
    background-color: #5A60F1;
    min-height: 40vh;
    border-radius: 10px;
    padding: 30px 50px;
    gap: 20px;
    position: relative;
    max-width: 800px;
    width:60%;
    align-items: center;
    flex-direction: column;
    img{
        height: 120px;
    }
    .wrapper{
        display: flex;
        flex-direction: column;
        gap: 22px;
        width: 100%;
        position: relative;
        max-width: 500px;
        margin: auto;

        
        .input-label-wrapper{
            display: flex;
            flex-direction: column;
            gap: 8px;
            label{
                color: white;
            }
            .input-wrapper{
                display: flex;
                flex-direction: row;
                gap: 10px;
                padding: 8px;
                border-radius: 10px;
                border: 4px solid white;
                position: relative;
                background-color: #fff;

                input{
                    border: none;
                    outline: none;
                    background-color: inherit;
                    font-size: 18px;
                    width: 100%;

                }
                
            }
        }
        .primary-btn{
            margin-top: 10px;
        }
    }
}
@media (max-width:600px){
    .body{
        width:80%;
    }
}
@media (max-width:400px){
    .body{
        .wrapper{
            .input-label-wrapper{
                .input-wrapper{
                    input{
                        font-size: 12px;
                    }
                }
            }
        }
    
    }
}
@media ${device.mobileS}{
    .body{
        width:100%;
    }
.btn{
    padding:8px 16px;
    font-size:16px;
}
}


`
