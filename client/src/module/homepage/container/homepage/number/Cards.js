import React from 'react'
import { styled } from 'styled-components'

export default function Cards({number,category}) {
  return (
    <Wrapper>
    <div>
        <h2>{number} +</h2>
        <div className='box'></div>
        <p>{category}</p>
    </div>
    </Wrapper>
  )
}

const Wrapper=styled.div`
width: max-content;
position: relative;
padding: 0 3vw;

&>div{
    display: flex;
    align-items: center;
    gap: 5px;
    h2{
        color: #2A4F6D;
        font-family: 'Rubik', sans-serif;
    }
    .box{
        height: 10px;
        width: 10px;
        background: linear-gradient(94.06deg, #FFB629 -1.21%, #FFDA56 58.66%, #FFD7A6 116.84%);
    }
    p{
        font-size: 12px;
    }

}

`