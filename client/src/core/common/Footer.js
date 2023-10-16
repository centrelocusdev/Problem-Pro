import React,{useState} from 'react'
import { styled } from 'styled-components'
import instagram from "./../../assets/images/common/instagram (1).png"
import linkedin from "./../../assets/images/common/linkedin (1).png"
import twitter from "./../../assets/images/common/twitter.png"
import call from "./../../assets/images/common/Icon (1).png"
import youtube from "./../../assets/images/common/youtube (1).png"
import { Link } from 'react-router-dom'
import { extraRequests } from '../../request/extraRequests';
import { device } from "../../assets/css/mediaQueries";



export default function Footer() {
  const [formData, setFormData] = useState({
    "email": "",
})
  const submitHandler=async(e)=>{
    try{
    e.preventDefault()
    const res = await extraRequests.subscribe(formData);
    alert(res);
    setFormData({
        "email": "",
    })
    }catch(err){
        console.log('Error' , err);
    }
  }
  const onChangeHandler=async(e)=> {
    setFormData(() => ({
        ...formData,
        [e.target.name]: e.target.value
    }))
  }
  return (
    <Wrapper>
      <div>
        <div className='center'>
        <h5>Problem Pro</h5>
        <div className="social-media">
            <a><img src={twitter} /></a>
            <a><img src={linkedin} /></a>
            <a><img src={youtube} /></a>
            <a><img src={instagram} /></a>
        </div>
        <button className='primary-btn'>Disclaimer</button>
        <div className="copyright">
          &copy; Copyright 2023. Problem Pro
        </div>
        </div>
        
        {/* <div className='top'>
          <div className="left">
            <h4 className="heading">Newsletter</h4>
            <div className="input-wrapper">
              <input onChange={onChangeHandler} name="email" value={formData.email} type="text"  placeholder='Enter Your Email'/>
              <button onClick={submitHandler} className='primary-btn'>Subscribe</button>
            </div>
          </div>
          <div className="right">
            <p>Privacy Policy</p>
            <p>Terms And Conditions </p>
            <p>Support</p>
          </div>
        </div>
        <hr/>
        <div className='bottom'>
          <p className="left">© 2023 Problem Pro</p>
          <div className="right">
            <a><img src={twitter} /></a>
            <a><img src={linkedin} /></a>
            <a><img src={youtube} /></a>
            <a><img src={instagram} /></a>
          </div>
        </div> */}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
width: 100vw;
padding-top: 1.75rem; /* 28px */
padding-bottom: 1.75rem; /* 28px */
background-color: #5A60F1;
&>div{
  .center{
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    h5{
      font-size: 1.875rem;
      line-height: 2.25rem; 
      font-weight:inherit;
    }
    .social-media{
      display:flex;
      gap: 5px;
      justify-content:center;
      margin-top:1rem;
      color:black;
      font-size: 1.25rem; /* 20px */
      line-height: 1.75rem; /* 28px */

      img{
        height:25px;
        width:25px;
      }
    }
    button{
      font-size:12px;
    }
    .copyright{
      text-align:center;
      padding-top: 0.75rem; /* 12px */
      border-top-width: 1px;
      font-size:12px;

    }
  }

}
`

// const Wrapper=styled.div`
// width:100vw;
// position: relative;
// background-color: #D7F7FD;
// padding: 72px 5% 0 5%;

// &>div{
//   position: relative;
//   max-width: 1196px;
//   margin: auto;

//   .top{
//     display: flex;
//     flex-direction: row;
//     justify-content: space-between;
//     padding-bottom: 10px;
//     .left{
//       display: flex;
//       flex-direction: column;
//       gap: 10px;
//       .heading{
//         color: #03256C;
//         font-family: 'Judson',serif;
//         font-size: 26px;
//       }
//       .input-wrapper{
//         display: flex;
//         gap: 20px;
//         input{
//           width: 300px;
//           background-color: white;
//           border-radius: 30px;
//           border: none;
//           outline: none;
//           padding-left: 20px;
//         }
//       }
//     }
//     .right{
//       display: flex;
//       flex-direction: column;
//       gap: 24px;
//       font-size: 14px;
//       align-items: flex-end;
//     }

//   }
//   .bottom{
//     padding: 10px 0;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     .left{
//       color: #2E3537;
//       font-size: 12px;
//       font-weight: 700;
//     }
//     .right{
//       display: flex;
//       gap: 10px;
//       img{
//         height: 24px;
//       }
//     }
//   }
//   .primary-btn{
//     padding: 10px 32px;

//   }
// }
// @media ${device.mobileL}{
//   &>div{
//     .top{
//       flex-direction:column;
//       gap:25px;
//       .left{
//         align-items:center;
//       }
//       .right{
//       flex-direction:row;
//       justify-content:center;
//       p{
//         font-size:12px;
        
//       }
//     }
//     }

//   }

// }

// @media ${device.mobileM}{
//   &>div{
//     .top{
//       .left{
//         .input-wrapper{
//         display: flex;
//         gap: 20px;
//         input{
//           width: 200px;
//           background-color: white;
//           border-radius: 30px;
//           border: none;
//           outline: none;
//           padding-left: 10px;
//         }
//       }
//       }
//       .right{
//         p{
//           font-size:8px;
//         }
//       }
//     }
//     .primary-btn{
//     padding: 10px 20px;

//   }
//   }
  
// }


// `