import React, { useState } from 'react'
import { styled } from 'styled-components'
import SearchSection from './SearchSection'
import Result from './Result'
import { device } from "../../../../assets/css/mediaQueries"


export default function Index() {
    const [generatedResult,isGeneratedResult]=useState("");
    const [loading, setLoading] = useState(false);

    const updateLoading = (value)=> {
        setLoading(value);
    }

  return (
    <Wrapper>
        <div className="left">
            <SearchSection isGeneratedResult={isGeneratedResult} loading={loading} updateLoading={updateLoading}/>
        </div>
        <div className="right" >
            <Result generatedResult={generatedResult} loading={loading}  updateLoading={updateLoading}/>
        </div>
    </Wrapper>
  )
}


const Wrapper=styled.div`
background-color: #5A60F1;
height:fit-content;
display: flex;
flex-direction: row;
justify-content:space-between;
gap: 30px;
padding: 50px 20px;
/* max-width:1410px; */
.left{
    width:50%;
    height:100%;
}
.right{
    width:50%;
    height:100%;
}
@media (max-width:930px){
    margin:0 10px;
    gap:10px;
    justify-content:space-between;
    padding: 40px 0;
    .left{
        width:50%;
    }
    .right:{
        width:50%;
    }

}
@media (max-width:700px){
    flex-direction:column;
    gap:2rem;
    padding: 40px 40px;
    .left{
        width:100%;
    }
    .right{
        width:100%;
    }
}
@media (max-width:500px){
    padding: 50px 10px;

}

`