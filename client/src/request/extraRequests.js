import axios  from "axios";
//const Backend_URL = process.env.REACT_APP_BACKEND_URL;
// const Backend_URL = "problem-pro-server-final-3zvw58361-centrelocusdev.vercel.app";
const Backend_URL = "https://problem-pro.onrender.com";



const contactUs = async (formData) => {
  try {
    const res = await axios.post(`${Backend_URL}/contact`, formData);
    return res.data.message;
  } catch (err) {
    console.log('Error' , err);
  }
};
const subscribe = async (formData) => {
  try {
    const res = await axios.post(`${Backend_URL}/add-subscriber`, formData);
    if(res){
      return res.data.message;
    }
  } catch (err) {
    console.log('Error' , err);
  }
};

export const extraRequests = {
  contactUs,
  subscribe
};
