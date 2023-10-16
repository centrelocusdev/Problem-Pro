import React from 'react'
import { styled } from 'styled-components'
import Banner from './banner'
import Form from './form'

export default function RequestForm() {
  return (
    <Wrapper>
      <div>
        <Banner/>
        <Form/>
      </div>


    </Wrapper>
  )
}

const Wrapper=styled.div`
width: 100%;

`
