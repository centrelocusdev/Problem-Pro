import React from 'react'
import { styled } from 'styled-components'
import background from "./../../../../../assets/images/common/Image.png" 
import partner1 from "./../../../../../assets/images/common/1 (1).png" 
import partner2 from "./../../../../../assets/images/common/2.png" 
import partner3 from "./../../../../../assets/images/common/3.png" 
import partner4 from "./../../../../../assets/images/common/4.png" 

export default function Partner() {
  return (
    <Wrapper>
        <div>
            <img src={partner1}/>
            <img src={partner2}/>
            <img src={partner3}/>
            <img src={partner4}/>
        </div>
    </Wrapper>
  )
}

const Wrapper=styled.div`
    width:100vw ;
    background-image:linear-gradient(90.13deg, rgba(0, 0, 0, 0.9) 1.07%, rgba(0, 0, 0, 0.6) 99.9%), url(${background});
    padding: 90px 0;
    &>div{
        margin: auto;
        max-width: 1196px;
        display: flex;
        flex-wrap: nowrap;
        img{
            width: 25%;
        }
    }


`
