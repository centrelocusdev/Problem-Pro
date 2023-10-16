const User = require("../models/userModal");
const ContactUs = require("../models/contactUsModel");
const Subscriber = require("../models/SubscriberModal");
const bcrypt = require("bcrypt");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const moment = require("moment");
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken')
const otpGenerator = require('otp-generator');
var fs = require('fs');
var path = require('path');
// const { OTP_LENGTH, OTP_CONFIG } = require('../constants/constants');

const OTP_CONFIG= {
  upperCaseAlphabets: true,
  specialChars: false,
}
const generateOTP = () => {
  const OTP = otpGenerator.generate(5, OTP_CONFIG);
  return OTP;
};


//get user by email
const getUserByEmail = async(email)=> {
const user = await User.findOne({email});
return user;
}


//get user by token
exports.getUserByToken =  async (req, res, next) => {
  try {
    const token = req.body.token;
    const user = await User.findOne({ token });
    req.user = user;
    }catch(err){
        console.log("error" , err.message);
    }
next();
}

//signup
exports.register = async (req, res) => {
  try {
    // If account with received email id already exists so return error message.
    const user = await User.findOne({email: req.body.email});
    if(user){
      res.status(200).json({
        status: "fail",
        message: "Email is already exists. Go to the Login Page."
      })
    }else{
      const newUser = new User(req.body);
      await newUser.generateAuthToken();
      await newUser.save();
      newUser.password = undefined;

    res.status(200).json({
        status: "success",
        data: newUser,
        message: "Signup Successful!"
      })
    }
    

    // const customer = await stripe.customers.create({
    //   name: user.name,
    //   email: user.email,
    // });
    // user.customer_id = customer.id;

    // if (!customer) {
    //   throw new Error("something went wrong");
    // }

   
  } catch (err) {
    res.status(400).send({ status: "error", message: err.message });
  }
}

//login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found, please sign up first!")
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Incorrect Password, Please write correct password");
    else {
    
      await user.generateAuthToken();
      req.user = user;
      res.status(200).send({ status: "success", data: user, message: "Login successful!"});
    }
  } catch (err) {
    res.status(400).send({ status: "error", message: err.message });
  }
}

//update
exports.updateProfile = async (req, res) => {
  try {
    const user = req.user;
    const userId = req.user._id;
    const name = req.body.Name;
    const organisation = req.body.Organisation;
    const email = req.body.Email;
    const profession = req.body.Profession;
    const avatar = req.body.avatar;
    // const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`;

      // // if (req.file) {
      // //   console.log("req.file", req.file);
      // //   console.log("req.file.filename" , req.file.filename);
      // //   user.avatar = image;
      // // }
      // user.save();
      // const image = fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename));

    const result = await User.updateOne({_id: userId} , {
      $set: {
        name,
        organisation,
        email,
        profession,
        avatar: req.body.avatar
      }
    })
    if(result.acknowledged){
      res.status(200).json({
        status:'success',
        data:true,
      })
    }

    // const id = req.user._id;
    // const user = await User.findOne({ id });
    // if (!user) throw new Error("user not found");

    // const fieldsToBeUpdated = ["password", "profession", "organisation", "name"];
    // const fields = Object.keys(req.body);

    // fieldsToBeUpdated.map((f, i) => {
    //   if (fields.includes(fieldsToBeUpdated[i])) {
    //     user[f] = req.body[f];
    //   }
    // });
    
    // res.send({status: 'success', message: 'profile updated successfully'});
  } catch (err) {
    res.status(400).send({status: 'error', message: err.message });
  }
}

//logout
exports.logout = async (req, res) => {
  try {
    const user = req.user;
    // user.tokens = user.tokens.filter((token) => token != req.token);
    // await user.save();
    if(user){
      res.status(200).json({
        status: "success"
      })
    }else{
      throw new Error('User not found!')
    } 
  } catch (err) {
    res.status(400).json({status: 'error', message: err.message });
  }
}
exports.forgotPassword= async(req, res)=> {
  const email = req.body.email;
  const otp =  generateOTP();
  const user = await getUserByEmail(email);
   

  try{
    if(!user){
      throw new Error("User not found!")
    }
    user.otp = otp;
    await user.save();
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD
      },
      
    });
    var mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: 'Reset Password Link',
      text: `Here is the OTP ${otp}. Use this to reset password.`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        res.status(200).json({
          status: 'success',
        })
      }
    });


  }catch(error){
    res.status(400).send({status: "error" , message: error.message});
  }
}
exports.resetPassword = async(req, res) => {
    const otp = req.body.otp;
    const newPassword = req.body.newPassword;
    const email = req.body.email;
    const user = await getUserByEmail(email);
    try{
      //if user is not valid
      if(!user){
        throw new Error("User not found!")
      }
      // if otp is not valid
      if(user.otp != otp){
        throw new Error("OTP is invalid!")
      }

      const password = await bcrypt.hash(newPassword, 9);
      const result = await User.updateOne({_id: user._id} , {
        $set: {
          password,
          otp: ""
        }
      })
      if(result.acknowledged){
        
        res.status(200).json({
          status:'success',
        })
      }
    }catch(err){
      res.status(400).send({ status: "error", message: err.message });

    }
}
exports.changePassword = async(req, res) => {
  try{
    const user = req.user;
    const id = user._id;
    const token = req.body.token;
    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;

  // Check if POSTed current password is correct
  if (!(await bcrypt.compare(currentPassword, user.password))) {
  throw new Error("Your current password is Incorrect!.")
  }
    
    user.password = newPassword;
    await user.generateAuthToken();
    user.save();

    res.status(200).json({
      status: "success",
      data: user
    })
  }catch(err){
    res.status(400).send({ status: "error", message: err.message });
  }
}
//delete account permenenty
exports.deleteAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    res.send({ msg: "Account deleted successfully" });
  } catch (err) {
    res.status(400).send({ status: "error", message: err.message });
  }
}

exports.countNote = async (req, res) => {
  try {
    const { id } = req.query;
    const user = await User.findById(id);
    if (!user) throw new Error("user not found");

    user.note_count += 1;
    await user.save();
  } catch (err) {
    res.status(501).send({status: 'error', message: err.message });
  }
}

exports.resetCountNote = async (req, res) => {
  try {
    const user = await User.findById(req.body.id);
    if (!user) throw new Error("user not found");

    user.note_count = 0;
    await user.save();
  } catch (err) {
    res.status(500).send({status: 'error', message: err.message });
  }
}

exports.startTrial =  async (req, res) => {
  try {
    const { userId } = req.body
    const user = await User.findById(userId)
    user.trial = true
    user.trial_started_at = new Date() 
    await user.save()
    res.status(200).send({ status: "success", message: "Trial has been activated" });
  } catch (err) {
    res.status(500).send({status: 'error', message: err.message });
  }
}

exports.addSubscriber = async (req, res) => {
  try {
    const subscriber = new Subscriber(req.body)
    await subscriber.save()
    res.status(200).send({ status: "success", message: "You have successfully subscribed" });
  } catch (err) {
    res.status(500).send({status: 'error', message: err.message });
  }
}

exports.contactUs = async (req,res) => {
  try{
    const contact = await new ContactUs(req.body);
    await contact.save();
    res.status(200).send({ status: "success", message: "We have received your query, we will reach you out soon." });

  }catch(err){
    res.status(500).send({status: 'error', message: err.message });
  }
}