const mongoose = require('mongoose')
const validator = require('validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Question = require('../models/questionModel');


const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!']

  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide your email'],
    validate: [validator.isEmail, 'Please provide a valid email']

  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  profession: String,
  organisation: String,
  avatar: String,
  otp: String,
  
  note_count: {
    type: Number,
    default: 0
  },
  customer_id: String,
  token: String,
  trial: Boolean,
  trial_started_at: Date,
  subs_id: String,
  subs_plan_id: String,
  planType:String,
  planStartDate: String,
  planEndDate: String,
  planDuration: String,
  trial_status: String,
  subs_status: String,
  trial_start: String,
  trial_end: String,
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
}
)

//virtual poppulation of Questions on each user
userSchema.virtual('questions' , {
  ref: 'Question',
  foreignField: 'User',
  localField: '_id'

})


// generating tokens for user
userSchema.methods.generateAuthToken = async function() {
	const token = jwt.sign({_id: this._id.toString()}, process.env.JWT_SECRET) //generating token
	this.token = token 
	await this.save()
	return token
}

userSchema.pre('save', async function (next) {
  try {
    if(this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 9)
  }
  next()
  } catch (err) {
      console.log(err)
  }
})



module.exports = mongoose.model('User', userSchema)