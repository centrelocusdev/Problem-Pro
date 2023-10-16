import React from 'react'
import background from "./../../../../assets/images/request/Rectangle.png"
import { styled } from 'styled-components'

export default function Banner() {
  return (
    <Wrapper>
        <div className='main'>
            <div className="sub-haeding">
            <span></span>
             <p>Request</p>
            </div>
          <h1 className="heading">Request Us  </h1>
        </div>

    </Wrapper>
  )
}

const Wrapper=styled.div`
width: 100vw;
background-image:linear-gradient( rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.6)), url(${background});
background-repeat: no-repeat;
background-position: center;

.main{
  max-width: 1196px;
  margin: auto;
  height: 350px;
  display: flex;
  flex-direction: column;
  color: white;
  justify-content: center;
  .sub-haeding{
            position: relative;
            display: flex;
            gap: 3px;
            background-color: #041C37;
            width: max-content;
            padding-right: 10px;
            span{
                height: 100%;
                width: 5px;
                display: block;
                background: linear-gradient(94.06deg, #FFB629 -1.21%, #FFDA56 58.66%, #FFD7A6 116.84%);
            }
            p{
                font-size: 12px;
                padding: 5px 0;

            }
        }
}

`