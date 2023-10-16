// import { Configuration, OpenAIApi } from "openai"
import { toast } from "react-toastify";

import axios from 'axios';
const Backend_URL = process.env.REACT_APP_BACKEND_URL;
// const Backend_URL = "problem-pro-server-final-3zvw58361-centrelocusdev.vercel.app";


const generateAI = async(payload , isPdfData)=>{
  try{
    const res = await axios.post(`${Backend_URL}/create-question` ,
    {
      "prompt": payload,
      "token": localStorage.getItem("token"),
      "isPdfData": isPdfData
    });
    if(res){
      return res.data.data.QuestionsData;
    }else{
      return false;
    }
  }catch(error){
    if(error && error.response && error.response.data){
      const { message } = error.response.data;
      toast.error(message);

    }else{
      toast.error("Something went wrong!");
    }
    return;
  }
}



const getQuestionsfromAI = async() => {
  try{
    const res = await axios.post(`${Backend_URL}/get-questions`, {
        "token": localStorage.getItem("token")
    })
    if(res){
      return res.data;
    }else{
      return false;
    }
  }catch(error){
    if(error && error.response && error.response.data){
      const { message } = error.response.data;
      toast.error(message);

    }else{
      toast.error("Something went wrong!");
    }
    return;
  }
}

const getParticularQuestionData = async(_id) => {
  try{
    const res = await axios.post(`${Backend_URL}/get-question`, {
      "token": localStorage.getItem("token"),
      "_id": _id
    })
    if(res){
      return res;
    }else{
      return false;
    }

  }catch(error){

  }
}

const getQuestionsOfParticularGrade= async(grade)=> {
  try{
    const res = await axios.post(`${Backend_URL}/get-questions`, {
        "token": localStorage.getItem("token")
    })

    if(res){
      const allQuestions = res.data.data;
    const response = allQuestions.filter((item) => {
      return item.Grade === grade;
    })

    return response;
    }else{
      return false;
    }
    
  }catch(error){
    if(error && error.response && error.response.data){
      const { message } = error.response.data;
      toast.error(message);

    }else{
      toast.error("Something went wrong!");
    }
    return;
  }
}

export {generateAI , getQuestionsfromAI , getParticularQuestionData , getQuestionsOfParticularGrade};
