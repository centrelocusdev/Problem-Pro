import React from "react";
import { styled } from "styled-components";
import img from "./../../../../../assets/images/homepage/Recruiting advertisement.png";
import background from "./../../../../../assets/images/homepage/aboutus.png";
import vectorDown from "./../../../../../assets/images/homepage/Vector-down.svg";
import vectorLeft from "./../../../../../assets/images/homepage/Vector-left.png";
import EmptyHourglass from "./../../../../../assets/images/homepage/Empty Hourglass.png";
import Goal from "./../../../../../assets/images/homepage/Goal.png";
import Handshake from "./../../../../../assets/images/homepage/Handshake.png";

import { device } from "../../../../../assets/css/mediaQueries";

export default function AboutUs() {
  const AboutData = [
    {
      heading: "OUR STORY",
      img: EmptyHourglass,
      para: "At ProblemPro, Our Journey Began With A Simple Idea: To Empower Educators And Parents With A Tool That Makes Learning Support More Effective And Personalized. We Recognized The Challenges Faced By Tutors, Parents, And Students When It Came To Finding Relevant Practice Materials. This Drove Us To Develop An AI-Powered Platform That Transforms Homework Assignments Into Opportunities For Growth And Mastery.",
    },
    {
      heading: "OUR MISSION",
      img: Goal,
      para: "Our Mission Is To Revolutionize Learning Support By Providing A Seamless Platform Where Tutors, Parents, And Students Can Access Personalized Practice Materials. We're Dedicated To Promoting Independent Learning, Improving Academic Outcomes, And Making The Educational Journey Enjoyable And Efficient.",
    },
    {
      heading: "JOIN US",
      img: Handshake,
      para: "We Invite You To Join Us On This Exciting Journey Of Transforming Education. Sign Up For A Free Trial Today And Experience The Power Of AI-Driven Learning Support. Together, We Can Help Students Reach Their Full Potential And Make Learning A Truly Personalized Experience.",
    },
  ];
  return (
    <>
      <Wrapper>
        <div className="main" id="about">
          <img className="vector-down" src={vectorDown} alt="vector-down" />
          <img className="vector-left" src={vectorLeft} alt="vector-left" />
          <div className="inner-about">
            <h5 className="sub-title">About Us</h5>
            <div className="body">
              {AboutData.map((item ,i)=> {
                return(
                  <div style={i===1 ? {backgroundColor: "#FFCDEA"} : {}} className="about-card">
                    <h2 style={i===1? {color: "#03256C"}: {}}>{item.heading}</h2>
                    <div style={i===1 ? {backgroundColor: "#03256C"} : {}}className="image-box">
                    <img src={item.img} alt="about-card"/>
                    </div>
                    <p style={i===1? {color: "#03256C"}: {}}>{item.para}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  /* width: 100vw; */
  /* background-color: #4CD0E9; */
  /* background-image: url(${background}); */
  background-color: white;
  margin-top: -31px;
  padding: 10px 0 94px 0;
  position: relative;
  display: flex;
  justify-content: center;
  /* align-items: center; */

  .main {
    /* max-width:1440px; */
    width: 100%;
    margin: auto;
    background-color: #fff;
    border-radius: 10px;
    margin: 0 30px;
    

    .vector-left {
      position: absolute;
      left: 0;
      topp:0;
    }
    .vector-down {
      position: absolute;
      bottom: 0;
      right: 20px;
    }
    .inner-about{
      /* background-color:#5A60F1; */
      margin:70px 0  20px 0;

      .body {
      display: flex;

      /* gap: 3vw; */
      justify-content: center;
      align-items: center;
      position: relative;
      gap:20px;
      margin-top:60px;

      .about-card {
        display:flex;
        width: 380px;
        height: 320px;
        border-radius: 20px;
        background: #5a60f1;
        flex-direction:column;
        align-items:center;
        /* justify-content:center; */
        display: flex;
        padding: 10px 5px;
        position:relative;
        
        gap: 15px;
        h2{
          color: #FFF;
          text-align: center;
          font-family: Inika;
          font-size: 18px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          text-transform: capitalize;
          margin-top:60px;
        }
        .image-box{
          width: 100px;
          height: 100px;
          border-radius:100%;
          background-color:#fff;
          display:flex;
          justify-content:center;
          align-items:center;
          position:absolute;
          top:-50px;
        }
        img{
          width: 90%;
          height: 90%;
        }
        p{
          color: #FFF;
          text-align: center;
          font-family: 'Roboto', sans-serif;          
          font-size: 16px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
        }
      }
    }
    }
    
  }
  .sub-title {
    font-family: "Judson", serif;
    font-size: 48px;
    text-align: center;
    margin: auto;
    padding: 20px;
    width: max-content;
    position: relative;
    color: #03256C;
    &::after {
      content: "";
      position: absolute;
      bottom: 12px;
      left: 0;
      width: 100%;
      height: 4px;
      border-radius: 2px;
      background-color: white;
    }
  }
  @media ${device.tablet} {
    padding: 15px 0;

    .main {
      .inner-about{
        .body{
          flex-direction:column;
          gap:60px;
          .about-card{
            width:90%;
            .image-box{
              width: 70px;
              height: 70px;
              top:-30px;
        }
          }
        }
      }
      margin: 0 10px 50px 10px;
    }
  }

  @media ${device.mobileL} {
    padding: 1px;
    .sub-title {
      font-size: 18px;
      padding: 13px;
    }
    .main {
      margin: 0 10px 70px 10px;
      .inner-about{
        margin: 20px 0 20px 0;
        .body{
          .about-card{
            height:fit-content;
          }
        }
      }
      .vector-left {
      height:70px;
      width:70px;
    }
    .vector-down {
      height:70px;
      width:70px;
    }
    }
  }
`;
