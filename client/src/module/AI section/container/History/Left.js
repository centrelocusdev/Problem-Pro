import { styled } from "styled-components";
import { utils } from "../../../../core/utils";
import React, { useEffect, useState } from "react";
import back from "../../../../assets/images/common/back-arrow.svg";
import { NavLink } from "react-router-dom";
import { device } from "../../../../assets/css/mediaQueries";
import BarLoader from "react-spinners/BarLoader";

export default function Left({ _id , setIdFunction }) {
  const [selectedItem, setSelectedItem] =useState(_id);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const getQuestions = async () => {
    try{
      const res = await utils.getQuestionsfromAI();
      if(res){
        setQuestions(res.data);
      }
        
    }catch(err){
      console.log("Error" , err);
    }
    
  };
  const sendID = (id) => {
    setSelectedItem(id);
    setIdFunction(id);
  };

  useEffect(() => {
    getQuestions();
  }, []);

  useEffect(() => {
    if (questions.length === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [questions.length]);

  return (
    <Wrapper>
        <NavLink to="/dashboard/history">
        <div className="btn-back">
            <img src={back} alt="back button" />
            <span className="backButton">Back</span>
        </div>
        </NavLink>
      
        <NavLink to="/search">
            <button style={{width:98+'%'}} className="btn primary-btn">New +</button>
        </NavLink>
      {loading ? (
        <div className="bar-loading">
          <BarLoader color="#03256C"/>
        </div>
      ) : (
        <ul>
          {questions &&
            questions.map((item) => {
              return (
                <li >
                  
                  <button className={`btn-3 ${item._id === selectedItem ? 'active': ""}`}
                    onClick={() => {
                      sendID(item._id);
                    }}
                  
                  >
                    <input style={{marginRight: 10}} type="checkbox"/>
                    {item.LessonDescription}
                  </button>
                </li>
              );
            })}
          {/* <li>
                    <button className='btn-3 active'>Profit And Lose</button>
                </li> */}
        </ul>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  
  ul {
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    list-style: none;
    margin-top: 50px;
    height: 80vh;
    overflow-y: auto;
  }
  .btn{
    font-size:20px;

  }
  .btn-back {
    margin-bottom: 10px;
  }
  .btn-back img {
    height: 10px;
    width: 10px;
    margin-right: 5px;
  }
  .backButton {
    font-size: 18px;
    margin-bottom: 20px;
    color:#03256C;

  }
  button {
    width: 100%;
    border:none;
    display:flex;
    width: 100%;
    height: 50px;
    align-items: center;
    height:fit-content;
  }
  .active {
    border: 1px solid #FFCDEA;
    background: #FFCDEA;
    color: black;
  }
  @media ${device.tablet}{
.btn{
  height:40px;
}
  }
  @media ${device.mobileL}{
    .btn{
      font-size:18px;
    }
  }

`;
