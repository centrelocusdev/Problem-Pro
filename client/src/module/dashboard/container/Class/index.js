import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import arrowRight from "../../../../assets/images/common/Chevron-Right.png";
import { styled } from "styled-components";
import style from "./class.module.css";
import { utils } from "../../../../core/utils";
import { useNavigate } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";

const Index = () => {
  const [gradeQuestion, setGradeQuestion] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDataAvailable, setIsDataAvalaible] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const getQuestionsOfGrade = async () => {
    try {
      const res = await utils.getQuestionsOfParticularGrade(
        location.state.Grade
      );
      if(res){
        setGradeQuestion(res);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  

  useEffect(() => {
    getQuestionsOfGrade();
    setTimeout(() => {
      if (gradeQuestion.length === 0) {
        setIsDataAvalaible(false);
      }
    }, 5000);
  }, []);
  useEffect(() => {
    if (gradeQuestion.length === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [gradeQuestion.length]);

  if (loading && !isDataAvailable) {
    return (
      <>
        <div className={style.mainContainer}>
          <span>Classes</span>
          <span className={style.arrowRight}>
            <img src={arrowRight} alt="arrowRight" />
          </span>
          <span>{location.state.Grade}</span>
        </div>
        <div className={style.noData}>No Data Available.</div>
        </>
    );
  }
  return (
    <>
      <div className={style.mainContainer}>
        <span>Classes</span>
        <span className={style.arrowRight}>
          <img src={arrowRight} alt="arrowRight" />
        </span>
        <span>{location.state.Grade}</span>
      </div>
      {isDataAvailable && loading ? (
         <div className=" bar-loading">
            <BarLoader color="#03256C"/>
          </div>
      ) : (
        <div className={style.lessonCardContainer}>
          {gradeQuestion.map((item) => {
            return (
              <div onClick={()=> {navigate('/dashboard/output-page', {state: {Question: [item]}})}} className={style.lessonCard}>
                <div className={style.lessonCardInner}>
                  <div className={style.inner1}>{item.LessonDescription}</div>
                  <div className={style.inner2}>{item.QuestionsData.slice(0,1000)}..........</div>
                  <div className={style.inner3}></div>
                </div>
                <div className={style.questionTag}>
                    <div>{item.LessonDescription.length > 30 ? `${item.LessonDescription.slice(0, 30)}...` : item.LessonDescription}</div>
                    <div>Last Edited Few Minutes Ago</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

const Wrapper = styled.div`
background-color:#5A60F1;
`;

export default Index;
