const mongoose = require('mongoose')

const contactUsSchema = mongoose.Schema({
  first_name: {
    type: 'String',
    required: true
  },
  last_name: {
    type: 'String',
    required: true
  },
  email: {
    type: 'String',
    required: true
  },
  phone_number:{
    type:'Number',
    require: true
  },
  message: {
    type: "String",
    required: true
  }
})

module.exports = mongoose.model('ContactUs', contactUsSchema)