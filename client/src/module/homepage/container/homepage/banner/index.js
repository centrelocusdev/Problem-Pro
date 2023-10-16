import React from "react";
import { styled } from "styled-components";
import banner from "./../../../../../assets/images/homepage/home.jpg"
import { NavLink } from "react-router-dom";
import { device } from "../../../../../assets/css/mediaQueries";
import hexaTopLeft from './../../../../../assets/images/homepage/hexa-top-left.svg'
import hexaTopRight from './../../../../../assets/images/homepage/hexa-top-right.svg'
import hexaBottomLeft from './../../../../../assets/images/homepage/hexa-bottom-left.svg'
import hexaBottomRight from './../../../../../assets/images/homepage/hexa-bottom-right.svg'
import onlineBusinessNegotiation from './../../../../../assets/images/homepage/Online business negotiation.png'

export default function Banner() {
  return (
    <Wrapper>
      <div className="hero" id="hero">
        {/* <img className="top-left" src={hexaTopLeft} alt="top-left"/>
        <img className="top-right" src={hexaTopRight} alt="top-right"/>
        <img className="bottom-left" src={hexaBottomLeft} alt="bottom-left"/>
        <img className="bottom-right" src={hexaBottomRight} alt="bottom-right"/> */}


        <div className="left">
        <img src={onlineBusinessNegotiation} alt="online-business-negotiation"/>
        </div>
        <div className="right" >
            <h1>
            "Let AI Create the problem for you" 
            </h1>
            <p>At ProblemPro, we're on a mission to transform the way students learn and excel. Our innovative web platform harnesses the power of artificial intelligence to provide students, tutors, and parents with personalized practice materials, tailored to each student's unique needs.</p>
            <NavLink to="/search">
            <button className="btn primary-btn">Try Now</button>
            </NavLink>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  padding: 10rem 2vw;
  /* padding-top: .8rem; */
  background: linear-gradient(180deg, #5A60F1 0%, #797EF6 51.35%, #FFF 100%);
  /* background-image: url(${banner}); */
  background-size: cover;
  /* aspect-ratio: 16/9; */
  background-repeat: no-repeat;
  position:relative;
  .hero{
    max-width: 1400px;
    display: flex;
    /* gap: 4vw; */
    
  }
  /* .top-left{
    position:absolute;
    left:0;
    top:100px;
  }
  .bottom-left{
    position:absolute;
    bottom:60px;
    left:0;
  }
  .top-right{
    position:absolute;
    right:0;
    top:70px;
  }
  .bottom-right{
    position:absolute;
    right:0;
    bottom:80px;
  } */
  
   .left{
    img{
      /* height:50%; */
      /* width:100%; */
    }
   }
    /* padding-top: 126px; */
    .right{
      
      display: flex;
      align-items: center;
      flex-direction: column;
      padding-left: 2vw;
      gap: 30px;
    
        h1{
          color: #fff;
          text-align: center;
          font-family: Montaga;
          font-size: 56px;
          font-style: normal;
          font-weight: 400;
          line-height: 82px; /* 146.429% */
          text-transform: capitalize;
        }
        p{
          color: #fff;
          text-align: center;
          font-family: Inter;
          font-size: 20px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          text-transform: capitalize;
        }
        /* .sub-heading{
          color: black;
          font-size: 20px;
          opacity: .9;
          font-weight: 400;
        } */
    }
    /* .right{
      width: 50%;
      position: relative;
     img{
      width: 100%;
     } 
    } */

  
  .btn{
    font-size: 28px;
  }
  @media ${device.laptop}{
    
    &>div{
      .left{
        gap:5px;
        img{
        height:500px; 
        width:500px;
      }
      }
    }
  }

  @media (max-width:900px){
   .hero{
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-contern:center;
      .left{
        img{
          width:500px;
          height: 400px;
        }
      }
   }
  }

  @media ${device.mobileL}{
    .top-left{
      width:200px;
      height:200px;
  }
  .bottom-left{
    width:150px;
      height:150px;
  }
  .hero{
    .left{
      img{
        margin-top:-50px;
        height:50%;
        width:90vw;
      }
    }
    .right{
      h1{
        font-size: 46px;
        line-height:50px;
      }
      p{
        font-size: 16px;


      }
    }
  }
   
  }
`;
