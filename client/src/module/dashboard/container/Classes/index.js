import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { styled } from 'styled-components'
// import arrow from "./../../../../assets/images/dashboard/Chevron Right (1).png"
import GradeCard from '../../../../core/common/Grade'
import { device } from "../../../../assets/css/mediaQueries"


export default function Index() {
    const location=useLocation()
  return (
    <Wrapper>
        <div className="header">
        {location.pathname.split("/").map((ele,index,arr)=>{
            return(
                <>
                {
                    index>1 &&<>
                <Link className='page-heading' to={"/dashboard/"+ele}>{ele}</Link>
                {/* {index<arr.length-1 && <img src={arrow}/>} */}
                    </>
                }
                </>
                )
        })}
        </div>
        <div className="body">
            <GradeCard grade="1"/>
            <GradeCard grade="2"/>
            <GradeCard grade="3"/>
            <GradeCard grade="4"/>
            <GradeCard grade="5"/>
            <GradeCard grade="6"/>
            <GradeCard grade="7"/>
            <GradeCard grade="8"/>
            <GradeCard grade="9"/>
            <GradeCard grade="10"/>
            <GradeCard grade="11"/>
            <GradeCard grade="12"/>
            {/* <GradeCard grade="0"/> */}

        </div>
        
    </Wrapper>
  )
}


const Wrapper=styled.div`
display: flex;
flex-direction: column;
gap: 24px;
.header{
  
}
.body{
    display: flex;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.20);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);    /* min-height: 40vh; */
    padding: 20px;
    gap: 20px;
    flex-wrap: wrap;
    position: relative;
}



`