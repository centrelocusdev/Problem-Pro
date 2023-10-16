const Question = require('../models/questionModel');
const User = require('../models/userModal');
const axios = require("axios");
const { Configuration, OpenAIApi } = require('openai');
const maxTokensPerChunk = 20; // Adjust this based on your needs
const MAX_TOKENS_PER_REQUEST = 4096;  // GPT-3.5 Turbo maximum token limit

// // Function to tokenize text
// const tokenizeText = (text) => {
//   return text.trim().split(' ');
// };

// // Function to chunk text based on max tokens
// const chunkText = (tokens) => {
//   const chunks = [];
//   let currentChunk = [];
//   let currentTokenCount = 0;


//   for (const token of tokens) {
//     const tokenCount = token.split(' ').length;

//     if (currentTokenCount + tokenCount <= maxTokensPerChunk) {
//       currentChunk.push(token);
//       currentTokenCount += tokenCount;

//       if (currentTokenCount >= MAX_TOKENS_PER_REQUEST) {
//         chunks.push(currentChunk.join(' '));
//         currentChunk = [];
//         currentTokenCount = 0;
//       }

//     } else {
//       chunks.push(currentChunk.join(' '));
//       currentChunk = [token];
//       currentTokenCount = tokenCount;
//     }
//   }

//   if (currentChunk.length > 0) {
//     chunks.push(currentChunk.join(' '));
//   }

//   return chunks;
// };

// const chunkingInput = async(prompt) => {
  

//   const tokens = tokenizeText(prompt);
//   const tokenChunks = chunkText(tokens);

//   const responses = [];

//   for (const chunk of tokenChunks) {
//     try {
//       const response = await makeRequest(chunk); // Send encoded chunk to GPT-3
//       responses.push(response.choices[0].message.content.trim());
//     } catch (error) {
//       console.error('Error:', error);
//       throw new Error('Error in API request or response.');

//     }
//   }
//   console.log('Token chunks:', tokenChunks);

//   console.log("responses" , responses);
//   const combinedResponse = responses.join(' ');
//   console.log('Combined response:', combinedResponse);
//   return combinedResponse;
// }
// const makeRequest = async (chunk) => {
//   const response = await axios.post(
//     "https://api.openai.com/v1/chat/completions",
//     {
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: chunk }],
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.NODE_APP_OpenAIApi}`,
//       },
//     }
//   );
//   console.log("after request" , response);
//   // return response.data.choices[0];
//   return response.data;
// };



// exports.createQuestions = async (req, res, next) => { 
//   try {
    
//     let completeResponse = ""
//     let finishedReason = ""
//     let prompt = req.body.prompt
//     let isPdfData = req.body.isPdfData;
//     let maxLimit = 5
//     let newQuestion;
//     if(isPdfData=== true){
      
//       // const response = await makeRequest(prompt);
//      const response = await chunkingInput(prompt);
//      newQuestion = await new Question({
//       "Grade": "Any Grade",
//         "Subject": "General",
//         "LessonDescription": "General", 
//         "QuestionsData": response,
//         "User": req.user
//     })

//     newQuestion.save();
//     }else{
//       const data = req.body.prompt.split(',');  
//       const response = await chunkingInput(prompt);
//       newQuestion = await new Question({
//         "Grade": data[0],
//           "Subject": data[1],
//           "LessonDescription": data[2], 
//           "QuestionsData": response,
//           "User": req.user
//       })

//       newQuestion.save();
//     }
   
    
   
//     res.send({status: 'success', message:"we have the data", data: newQuestion});
//   } catch (err) { 
//     res.send({ status: "error", message: err.message });
//   }
// }

// const openai = new OpenAI(
//   {
//     apiKey: process.env.NODE_APP_OpenAIApi,
//   }
// )

// const makeRequest = async (prompt) => {
//   console.log("in th ")
//   try{
//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: prompt }],
//       // stream:true
//     })
    
//     return response.data.choices[0].message;

//   }catch(err){
//     res.status(400).send({ status: "error", message: err.message });
//   }
// }

const makeRequest = async (prompt) => {
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      max_tokens: 4000,
      messages: [{ role: "user", content: prompt + 'please make sure the res is complete' }],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.NODE_APP_OpenAIApi}`,
      },
    }
  );
  return response.data.choices[0];
};

exports.createQuestions = async (req, res, next) => { 
  try {
    let completeResponse = ""
    let finishedReason = ""
    let prompt = req.body.prompt
    let isPdfData = req.body.isPdfData;
    let maxLimit = 10
    let newQuestion;
    if(!prompt){
      throw new Error("Kindly Fill the form or upload pdf.");
      return;
    }

    do {
      const response = await makeRequest(prompt);
      finishedReason = response.finish_reason

      completeResponse += response.message.content
      prompt = `please complete this response: ${completeResponse}`

      if(maxLimit == 0 || finishedReason == 'stop') {
        break;           
      }
      maxLimit -= 1
     
    } while(maxLimit > 0);

    if(isPdfData=== true){
           newQuestion = await new Question({
            "Grade": "Any Grade",
              "Subject": "General",
              "LessonDescription": "General", 
              "QuestionsData": completeResponse,
              "User": req.user
          })
      
          newQuestion.save();
          }else{
            const data = req.body.prompt.split(',');  
            newQuestion = await new Question({
              "Grade": data[0],
                "Subject": data[1],
                "LessonDescription": data[2], 
                "QuestionsData": completeResponse,
                "User": req.user
            })
      
            newQuestion.save();
          }
   res.send({status: 'success', message:"we have the data", data: newQuestion});

    // res.send({status: 'success', data: completeResponse});
  } catch (err) { 
    res.send({ status: "error", message: err.message });
  }
};
exports.getUserQuestions = async(req, res, next)=> {
  try{
    const user = await User.findById(req.user._id).populate('questions');
  
    res.status(200).json({
      status: "success",
      data: user.questions
    })
  }catch(err){
    res.status(400).send({ status: "error", message: err.message });
  }
  
}  

exports.getUserQuestion = async(req,res,next)=> {
  try{
    const id = req.body._id;
    const user = await User.findById(req.user._id).populate('questions');
    const question = user.questions.filter((e)=> {
      return e._id == id;
    })
    res.status(200).json({
      status: "success",
      data: question
    })
  }catch(error){
    res.status(400).send({ status: "error", message: error.message });
  }
}

//some older code
// const openAi = new OpenAIApi(
//   new Configuration({
//     apiKey: process.env.NODE_APP_OpenAIApi,
//   })
// )

// const makeRequest = async (prompt) => {
//   try{
//     const response = await openAi.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: prompt }],
//       // stream:true
//     })
    
//     return response.data.choices[0].message;

//   }catch(err){
//     res.status(400).send({ status: "error", message: err.message });
//   }
// }
    

// const makeRequest = async (prompt) => {
//   console.log("prompt" , prompt);
//   const response = await axios.post(
//     "https://api.openai.com/v1/chat/completions",
//     {
//       model: "gpt-3.5-turbo",
//       // max_tokens: 250,
//       messages: [{ role: "user", content: prompt + 'please make sure the res is complete' }],
//     },
//     {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//       },
//     }
//   );
//   console.log("response" , response);
//   return response.data.choices[0];

// };

 // console.log("new question" , newQuestion);
    // do {
    //   const response = await makeRequest(prompt);
    //   console.log("response" , response);
    //   finishedReason = response.finish_reason

    //   completeResponse += response.message.content
    //   prompt = `please complete this response: ${completeResponse}`

    //   if(maxLimit == 0 || finishedReason == 'stop') {
    //     break;           
    //   }
    //   maxLimit -= 1
     
    // } while(maxLimit > 0);