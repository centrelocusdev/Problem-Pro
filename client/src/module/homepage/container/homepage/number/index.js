import React from 'react'
import { numbersData } from '../../../../../core/constant/numberData'
import { styled } from 'styled-components'
import Cards from './Cards'


export default function Numbers() {


    
  return (
    <Wrapper>
        <div>
        {numbersData.map(ele=>{
            return(
                <Cards number={ele.numbers} category={ele.category}/>
                )
            })}
  
            </div>
    </Wrapper>
  )
}

const Wrapper=styled.div`
width: 100vw;

&>div{
    display: flex;
    justify-content: center;
    padding:8vh;

}
`