import React from 'react'
import Index from '../container/Class/index';
import { styled } from 'styled-components'


const Class = () => {
  return (
    <Wrapper>
        <div>
            <Index/>
        </div>
    </Wrapper>
    
  )
}

const Wrapper=styled.div`
border-radius: 20px;
    display: flex;
    width: 100%;
    height: 100vh;
    overflow-y:scroll;
    padding: 20px;
    flex-direction: column;
    align-items: start;
    /* gap: 10px; */
    margin-top:10px;

`
export default Class