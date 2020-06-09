const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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

//pre save hooked: function run before we save
// this function hashes and salts the users password
userSchema.pre('save', function (next) {
  const user = this
  if (!user.isModified('password')) {
    return next
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err)
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err)
      }
      user.password = hash
      next()
    })
  })
})

//comparing passwords
userSchema.methods.comparePassword = function (candidatePassword) {
  const user = this

  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err)
      }
      if (!isMatch) {
        return reject(false)
      }
      resolve(true)
    })
  })
}

//userSchema is associated with mongoose
mongoose.model('User', userSchema)
