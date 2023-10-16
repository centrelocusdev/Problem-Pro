import React from 'react'
import { styled } from 'styled-components'
import intersect from "./../../../../../assets/images/homepage/Intersect.svg"  


import { device } from "../../../../../assets/css/mediaQueries";


export default function FeatureCard({heading , data , img}) {
  return (
    <Wrapper>
        <img src={img} alt="intersect"/>
        <div className='feature'>
        <h3>{heading}</h3>
        <p>{data}</p>
        </div>
    </Wrapper>
  )
}

const Wrapper= styled.div`
width:45%;
position: relative;
height: fix-content;
display: flex;
flex-direction:row;
justify-content:center;
align-items: center;
border-radius: 30px;
background: #5A60F1;
box-shadow: 0 8px 6px #1768AC;
padding:10px;
gap:10px;
/* max-width: 250px; */
.feature{
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  gap:10px;
  p{
    font-size: 1rem;
    color:#fff;
    font-family: 'Source Sans 3', sans-serif;
    text-align: start;
}
}
@media (max-width:600px){
  width:100%;

}
@media ${device.mobileL}{
  flex-direction:column;
    p{
      font-size:10px;
    }
    img{
      height:40px;
      width:40px;
      top:-18px;
    }
}




`
