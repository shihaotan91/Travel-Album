var mongoose = require('mongoose')
var bcrypt = require('bcrypt')

var userSchema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
})

userSchema.pre('save', function (next) {
  // console.log('before save hash the password')
  // console.log(this)

  var user = this

  bcrypt.genSalt(5, function (err, salt) {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err)

      user.password = hash
      // console.log('after hash')
      // console.log(user)
      next()
    })
  })
})

userSchema.methods.authenticate = function (givenPassword, callback) {
  console.log('given password is ' + givenPassword)
  console.log('saved password is ' + this.password)
  var hashedPassword = this.password

  bcrypt.compare(givenPassword, hashedPassword, function (err, isMatch) {
    callback(err, isMatch)
  })
}

var User = mongoose.model('User', userSchema)

module.exports = User
