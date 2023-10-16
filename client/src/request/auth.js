import { toast } from "react-toastify";

import { axiosInstanceJson } from "../core/constant/axiosInstances"
import axios from 'axios';
// const Backend_URL = 'http://localhost:3000';
const Backend_URL = process.env.REACT_APP_BACKEND_URL;


 const registerUser=async(formData)=>{
  try {
    const res = await axios.post(`${Backend_URL}/register`, formData);
    return res;
  } catch (error) {
    if(error && error.response && error.response.data){
      const { message } = error.response.data;
      toast.error(message);

    }else{
      toast.error("Something went wrong!");
    }
    return;
  }
      // try {
      // const res = axiosInstanceJson.post("/register",data)
      //  return res;
      // } catch (error) {
      //  return console.log(error.message)
      // }
} 


 const loginUser= async(formData)=>{
  try {
    const res = await axios.post(`${Backend_URL}/login`, formData);
    return res;
  } catch (error) {
    if(error && error.response && error.response.data){
      const { message } = error.response.data;
      toast.error(message);

    }else{
      toast.error("Something went wrong!");
    }
    return;
  }
      // try {
      // const res = await axiosInstanceJson.post("/login",data)
      // const response = {
      //   token: res.data.data.token,
      //   message: res.data.message
      // }
      
      // return response
      // } catch (error) {
      //   return error.response.data.message;
      // }
}  

 const logoutUser=async()=>{
  try{
    const res = await axios.post(`${Backend_URL}/logout`, {
        "token": localStorage.getItem("token")
    })
    if(res && res.data.status === 'success'){
      localStorage.removeItem("token");
      return true;
    }else{
      toast.error("User not found!");
      return false;
    }
  }catch (error) {
    if(error && error.response && error.response.data){
      const { message } = error.response.data;
      toast.error(message);

    }else{
      toast.error("Something went wrong!");
    }
    return;
  }
} 

const updateProfile = async(formData) => {
  try{
    const res = await axios.post(`${Backend_URL}/update-profile`, {
        "token": localStorage.getItem("token"),
        "Name": formData.name,
        "Organisation": formData.organisation,
        "Email": formData.email,
        "Profession": formData.profession,
        "avatar": formData.image
    },
    // {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // }
    )
    if(res){
      return true;
    }
    
  }catch (error) {
    if(error && error.response && error.response.data){
      const { message } = error.response.data;
      toast.error(message);

    }else{
      toast.error("Something went wrong!");
    }
    return;
  }
}

const getUserData = async() => {
  try{
    const res = await axios.post(`${Backend_URL}/get-user-data` , {
      "token": localStorage.getItem("token")
    })
    return res;
  }catch (error) {
    if(error && error.response && error.response.data){
      const { message } = error.response.data;
      toast.error(message);

    }else{
      toast.error("Something went wrong!");
    }
    return;
  }
}

const changePassword = async(currentPassword, newPassword) => {
  try{
    const res = await axios.post(`${Backend_URL}/change-password` , {
      "token": localStorage.getItem("token"),
      "currentPassword": currentPassword,
      "newPassword": newPassword
    })
    if(res && res.data.status === 'success'){
      localStorage.removeItem("token");
      return true;
    }
  }catch (error) {
    const { message } = error.response.data;
    toast.error(message);if(error && error.response && error.response.data){
      const { message } = error.response.data;
      toast.error(message);

    }else{
      toast.error("Something went wrong!");
    }
    return;
  }
}
const forgotPassword = async(email) => {
  try{
    const res = await axios.post(`${Backend_URL}/forgot-password` , {
      "email": email
    })
    if(res && res.data.status === 'success'){
      toast.success("OTP has been sent to your email!");
      return true;
    }
  }catch (error) {
    if(error && error.response && error.response.data){
      const { message } = error.response.data;
      toast.error(message);

    }else{
      toast.error("Something went wrong!");
    }
    return;
  }
}
const resetPassword = async(newPassword , otp , email) => {
  try{
    const res = await axios.post(`${Backend_URL}/reset-password` , {
      "newPassword": newPassword,
      "otp": otp,
      "email": email
    })
    if(res && res.data.status === 'success'){
      toast.success("Password Updated Successfully!")
      return true;
    }
  }catch (error) {
    if(error && error.response && error.response.data){
      const { message } = error.response.data;
      toast.error(message);

    }else{
      toast.error("Something went wrong!");
    }
    return;
  }
}


export const auth={
  registerUser,
  loginUser,
  logoutUser,
  updateProfile,
  getUserData,
  changePassword,
  forgotPassword,
  resetPassword

}
