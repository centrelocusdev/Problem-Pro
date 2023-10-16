import React from "react";
import plus from "./../../assets/images/dashboard/Grade 5.png";
import dots from "./../../assets/images/dashboard/Menu Vertical.png";
import { styled } from "styled-components";
import { device } from "../../assets/css/mediaQueries";

import { useNavigate } from "react-router-dom";

export default function GradeCard({ grade }) {
  const navigation = useNavigate();
  return (
    <Wrapper>
      {grade == 0 ? (
        <div
          // onClick={() => {
          //   navigation("/dashboard/class", {
          //     state: { Grade: `Grade ${grade}` },
          //   });
          // }}
        >
          <img src={plus} alt="grade" />
        </div>
      ) : (
        <div
          onClick={() => {
            navigation("/dashboard/class", {
              state: { Grade: `Grade ${grade}` },
            });
          }}
        >
          <h3>Grade {grade}</h3>
          <img src={dots} alt="grade" />
        </div>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  border-radius: 20px;
  border: 1px solid #fff;
  background: linear-gradient(180deg, #fff 0%, #ffcdea 100%);
  box-shadow: 0px 4px 4px 0px #fff;
  height:30%;
  width:30%;
  /* height: max-content;
  width: calc((100% - 20px) / 4 - 10px); */
  div {
    padding: 25% 8%;
    display: flex;
    justify-content: center;
    flex-direction: row;
    gap: 30px;
    color: #03256c;
    align-items: center;
    font-size: 22px;
    font-weight: 600;

    h3 {
      font-weight: 500;
    }
    img {
      height: 40px;
      width: 40px;
    }
  }

  @media ${device.laptop} {
    div {
      font-size: 12px;
      img {
        height: 15px;
      }
    }
  }
   @media (max-width: 920px){
      width:28%;
      height:28%;
    
   }
  @media ${device.tablet} {
    div {
      padding: 30% 0px;
      font-size: 32px;
      gap: 5px;

      img {
        height: 28px;
      }
    }
  }
  @media ${device.mobileL} {
    div {
      gap: 2px;
      font-size:22px;

      img {
        height: 18px;
      }
    }
  }
  @media ${device.mobileM} {
    div {
      font-size: 12px;
      img {
        height: 18px;
      }
    }
  }
`;
