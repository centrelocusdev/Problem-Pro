import React from 'react'
import { useMutation } from 'react-query'
import { styled } from 'styled-components'
// import { postTruckRequest } from '../../../../request/truckRequest'

export default function Form() {

  const {isLoading, error, data,mutate} =useMutation("postTruckRequest","postTruckRequest",{
    onSuccess:(res)=>{
      alert("Data record success")
    },
    onError:()=>{
      alert("Something is wrong ")
    }
  })

  const submitHandler=(e)=>{
    e.preventDefault()
    const payload =new FormData(e.target)
    mutate(payload)
  }
    
  return (
    <Wrapper>
        <form onSubmit={(e)=>submitHandler(e)}>
            <label for="mobile">mobile:</label>
            <input  type="text" id="mobile" name="mobile" required/>

            <label for="noOfTrucks">No of trucks:</label>
            <input type="text" id="noOfTrucks" name="noOfTrucks" required/>

            <label for="city">City:</label>
            <textarea id="city" name="city" required></textarea>

            <button type="submit" disabled={isLoading}>{isLoading?"Please wait":"Submit"} </button>
        </form>

    </Wrapper>
  )
}

const Wrapper=styled.div`
width: 100vw;
max-width: 1196px;
margin: 40px auto;

form {
  padding: 40px;
  border-radius: 10px;
  border:1px solid #999;
  width: 400px;
  margin: 0 auto;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

input[type="text"],
input[type="email"],
textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
}

button[type="submit"] {
  background-color: #4CAF50;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #45a049;
}


`