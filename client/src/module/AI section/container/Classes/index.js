import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { styled } from 'styled-components'
import arrow from "./../../../../assets/images/dashboard/Chevron Right (1).png"


export default function Index() {
    const location=useLocation()
  return (
    <Wrapper>
        <div className="page-heading header">
        {location.pathname.split("/").map((ele,index,arr)=>{
            return(
                <>
                {
                    index>1 &&<>
                <Link to={"/dashboard/"+ele}>{ele}</Link>
                {index<arr.length-1 && <img src={arrow}/>}
                    </>
                }
                </>
                )
        })}
        </div>
        
        
    </Wrapper>
  )
}


const Wrapper=styled.div`
display: flex;
flex-direction: column;
gap: 24px;
.header{
    a{
        color: white;
        font-size: 26px;
        text-transform: capitalize;
    }
}
.body{
    display: flex;
    background-color: #80ddf0;
    min-height: 40vh;
    border-radius: 10px;
    padding: 20px;
    gap: 20px;
    flex-wrap: wrap;
    position: relative;
}


`