const mongoose = require('mongoose')

//userSchema defines what a user is: email and password
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    //tells mongoose that all emails is unique
    unique: true,
    //if user doesn't have an email it will throw an error and is invalid
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

//userSchema is associated with mongoose
mongoose.model('User', userSchema)
