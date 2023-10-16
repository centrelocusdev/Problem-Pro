import React, { useEffect, useState } from "react";
import style from "./history.module.css";
import IconLeft from '../../../../assets/images/dashboard/Icon Left.svg';
import { utils } from "../../../../core/utils";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";


const Index = () => {
  const navigate = useNavigate();
  let [questions, setQuestions] = useState([]);
  let [loading , setLoading] = useState(true);
  const [isDataAvailable, setIsDataAvalaible] = useState(true);


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
  useEffect(() => {
    getQuestions();
    setTimeout(() => {
      if (questions.length === 0) {
        setIsDataAvalaible(false);
      }
    }, 5000);
  }, []);
  useEffect(()=> {
    if(questions.length===0){
      setLoading(true);
    }else{
      setLoading(false);
    }
  } , [questions.length])


  if(loading && !isDataAvailable){
    return(
      <div>
      <div className={style.header}>History</div>
      <div className={style.container}>
        <p className={style.noData}>No Data Available</p>
      </div>
      </div>
    )
  }

  return(
    <>
      <div className={style.header}>History</div>
      {isDataAvailable && loading
      ? (
        
        <p className={style.loading}>
          <div className=" bar-loading">
          <BarLoader color="#03256C"/>
        </div>
        </p>

      ): (
        <div>
        {/* <button onClick={()=> {getQuestions()}}>click me</button> */}
        <div className={style.container}>
          
          <table className={style.table}>
            <tr className={style.mainTR} style={{backgroundColor: "#fff", height:60 , fontSize: 24, color: "#03256C",fontWeight:700,}}>
              <td>File Name</td>
              <td>Grade</td>
              <td>Last Modified</td>
            </tr>
            {questions && questions.map((item) => {
              return (
                <>
                  <tr className={style.tr}>
                    
                    <td className={style.lessonDescription} onClick={()=> {navigate('/history-details' ,{state: {_id: item._id}} )}}>
                    <input style={{marginRight:20}} type="checkbox" />
                    <p>
                    {item.LessonDescription}
                    </p>
                    </td>
                    <td>{item.Grade}</td>
                    <td>{item.createdAt.slice(0, 10)}</td>
                    <td><img src={IconLeft} alt="left"/></td>
  
                    
                  </tr>
                </>
              );
            })}
          </table>
        </div>
      </div>
      )
      
      }
    </>
  )
    
    }

export default Index;
