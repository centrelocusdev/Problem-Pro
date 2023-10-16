const User = require('../models/userModal');

exports.getUserData = async (req,res) => {
    try{
      let response;
      if(req.user){
        response = await User.find({_id: req.user._id});
      }
      res.status(200).json({
        status: 'success',
        data:response
      })
      
    }catch(err){
      res.status(400).send({ status: "error", message: err.message });
    }
  }

 
