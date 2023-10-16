import React, {useState, useEffect } from 'react'
import { styled } from 'styled-components'
import close from "./../../../../assets/images/common/icons8-close.svg"
import { useLocation } from 'react-router-dom';
import { jsPDF } from "jspdf";
import { device } from '../../../../assets/css/mediaQueries';
import BarLoader from "react-spinners/BarLoader";


export default function Right({questionData}) {

  const location = useLocation();
  const locationData = [location.state.Question];
  const [questions, setQuestions] = useState([]);
  const[loading, setLoading] = useState(true);


  const handleSaveAsPdf= (e) => {
    e.preventDefault()
    saveAsPdf(questions, 'problempro.pdf'); 
  }
  const saveAsPdf = (content, filename) => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width; // Get page width
    const margin = 20; // Set your desired margin in pixels
    const usableWidth = pageWidth - 2 * margin; // Adjust for left and right margins

    const lineHeight = 12; // Adjust line height based on your font size and style
    let y = 20; // Initial y position
  
    // Split the content into lines
    // const lines = content.split('\n');
    const lines = content;
    for (let i = 0; i < lines.length; i++) {
      // Calculate the remaining height on the page
      const remainingHeight = pageHeight - y;
  
      // If the remaining height is less than the line height, start a new page
      if (remainingHeight < lineHeight) {
        doc.addPage();
        y = 20; // Reset y position for the new page
      }
  
      // Add the line of text
      doc.text(margin, y, lines[i], { maxWidth: usableWidth });
  
      // Increment y position for the next line
      y += lineHeight;
    }
  
    doc.save(filename);
  };



  useEffect(()=> {
    if(questionData){
      if(questionData.length>=1){
        const output = [];
        output[0] = questionData[0].LessonDescription;
        const lines = questionData[0].QuestionsData.split('\n');
        for(let i = 1;i<lines.length;i++){
          output[i] = lines[i-1];
        }
        setQuestions(output);
      }
    }else if(location.state && location.state.Question){
      const localData = location.state.Question;
      if(localData.length>=1){
        const output = [];
        output[0] = localData[0].LessonDescription;
        const lines = localData[0].QuestionsData.split('\n');
        for(let i = 1;i<lines.length;i++){
          output[i] = lines[i-1];
        }
        setQuestions(output);
      }
    }
  }, [questionData, location])
  useEffect(()=> {
    if(questions.length === 0){
      setLoading(true);
    }else{
      setLoading(false);
    }
  }, [questions.length])
  if(loading){
    return(
      <Wrapper>
       <div className=" bar-loading">
          <BarLoader color="#03256C" />
        </div>
      </Wrapper>
    )
  }else{
    return (
      <Wrapper>
        <>
        <div className='output-box'>

        <div className='output'>
          {questions && questions.map((item , i) => {
          return <div className={`output-item ${i === 0 ? 'heading': ""} `}>{item}</div>
        })}
        </div>
        <button onClick={handleSaveAsPdf} className="pdf-btn primary-btn">
          Save as PDF
        </button>
        {/* <button className="close">
          <img src={close} alt="close"/>
        </button>  */}
        </div>
        
        </>
        
      </Wrapper>
    )
  }
  
}

const Wrapper=styled.div`
/* min-height: calc(100vh - 90px); */
height:100vh;
background-color: #fff;
border-radius: 20px;
position: relative;
padding:20px;
margin-top:35px;
.output-box{
  display:flex;
  flex-direction:column;
  justify-content: space-between;
  height:100%;

  .output{
  padding: 20px;
  max-height: 100vh;
  /* border:2px solid green; */
  overflow-y: auto;

  .output-item{
    color:#03256C;
    margin:5px;
  }
  .heading{
    font-weight:800;
    font-size: 30px;
  }
}
.pdf-btn{
  /* font-size:16px; */
  align-self:center;
}
.close{
top: 10px;
right: 10px;
background-color: transparent;
border: none;
outline: none;
position: absolute;
img{
  background: transparent;
}
}


}

@media ${device.mobileM}{
  .output-box{
    .pdf-btn{
      font-size:16px;
  }
  }
  
}

`
