import axios from "axios";
// const Backend_URL = "http://localhost:3000";
const Backend_URL = process.env.REACT_APP_BACKEND_URL;

export const axiosInstanceJson=axios.create({
    baseURL:Backend_URL,
    headers:{
        "Content-Type":"application/json"
    }
})

export const axiosInstanceFormdata=axios.create({
    baseURL:Backend_URL,
    headers:{
        "Content-Type":"multipart/form-data"
    }
})
