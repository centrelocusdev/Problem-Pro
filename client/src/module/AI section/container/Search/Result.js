import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { jsPDF } from "jspdf";
import { toast } from "react-toastify";
import BarLoader from "react-spinners/BarLoader";


export default function Result({generatedResult, loading, updateLoading}) {
  
  const [output, setOutput] = useState([]);
  // const jspdf = new jsPDF('p','pt','letter');
  const handleSaveAsPdf= (e) => {
    e.preventDefault()
    if(!generatedResult){
      toast("No Data to save as pdf!");
      return;
    }
    saveAsPdf(generatedResult, 'problempro.pdf'); 
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
  
//   const saveAsPdf = (content, filename) => {
//   const doc = new jsPDF();
//   let pageHeight= doc.internal.pageSize.height;

//   doc.setFontSize(8)

//   doc.text(content, 20, 25 );
//   doc.save(filename);
// };
  useEffect(()=>{
    setOutput(generatedResult);
  },[generatedResult])


  useEffect(()=> {
    if(generatedResult === null){
      updateLoading(true);
    }else{
      updateLoading(false);
    }
  } , [generatedResult])

  if(loading){
    return(
      <Wrapper>
        <div className="bar-loading">
          <p className='loading-heading'>The Magic is in progress...</p>
          <BarLoader color="#03256C"/>
        </div>
      </Wrapper>
    )
  }else{
    return (
      <>
      <Wrapper>
        <div className='output'>
        {output && output.map((item) => {
          return <div className='output-item'>{item}</div>
        })}
        </div>
        
        <button onClick={handleSaveAsPdf} className="btn primary-btn">
          Save as PDF
        </button>
      </Wrapper>
     
      </>
    )
  }
  
}

const Wrapper=styled.div`
/* min-height: calc(100vh - 100px); */
height:100vh;
position:relative;
background-color: #fff;
border-radius: 10px;
display:flex;
flex-direction: column;
align-items:center;
justify-content:space-between;
.bar-loading{
  display:flex;
  flex-direction:column;
  justify-content:center;
  gap:10px;
  ailgn-items:center;
  .loading-heading{
  color:#5a60f1;
  font-size:12px;
  font-weight:600
}
}

.output{
  padding: 20px;
  max-height: 100vh;
  overflow-y: auto;
  height:80%;
  /* border:2px solid green; */
  .output-item{
    color:gray;
    margin:5px;
  }
}
.btn{
font-size:16px;
margin-bottom: 10px;
}



`
