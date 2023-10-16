import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'
import profile from "../../assets/images/dashboard/Frame 3842.png"
import {auth} from '../../request/auth';
import { useNavigate } from 'react-router-dom';
import { device } from '../../assets/css/mediaQueries';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: ""
    })
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const res = await auth.forgotPassword(formData.email);
        if(res){
            navigate("/reset-password");
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
        <div className="body">
            <img src={profile} alt="" />
            <div className="wrapper">
                <form onSubmit={onSubmitHandler}>
                
                <div className="input-label-wrapper">
                        <label>Email</label>
                        <div className="input-wrapper">
                        <input onChange={onChangeHandler} value={formData.email} name="email" type="email" placeholder='Enter Your Email Id' />
                        </div>
                </div>
                <button className='btn primary-btn'>Submit</button>
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
/* width:60%; */
margin: 80px auto 20px auto;
gap: 24px;
a{
    color: white;
    font-size: 26px;
    text-transform: capitalize;
}

.body{
    display: flex;
    background-color: #5A60F1;
    height: 50vh;
    border-radius: 10px;
    padding: 30px 50px;
    gap: 20px;
    position: relative;
    width:60%;
    max-width: 800px;
    align-items: center;
    flex-direction: column;
    justify-content:center;
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
                    background-color: #fff;
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
@media (max-width:700px){
    .body{
        padding: 20px 20px;
        width:80%;
    }
}
@media (max-width: 500px){
    .body{
        padding: 20px 20px;
        height:40vh;
        img{
        height: 80px;
        }
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
.btn{
    padding:8px 16px;
    font-size:16px;
}
}


`
