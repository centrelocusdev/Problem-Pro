import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function NOTFOUND404() {

    const [state,setState]=useState(3)
    const naviagte=useNavigate()

    useEffect(()=>{
       const timer= setInterval(()=>{
        if(state==0){
            naviagte("/")
        }
        setState(state=>state-1)

        },1000)

        return ()=>{
            clearInterval(timer)
        }
    },[state])

  return (
    <>
    <div className='status-404'>

    </div>

        <h1>NOTFOUND404</h1>
        <h2>Redirecting to home page in {state} seconds</h2>
    </>

  )
}
