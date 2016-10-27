var LocalStrategy = require('passport-local').Strategy

var User = require('../models/user')

//serailizeUser is used to store userID into the session
module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user)
    })
  })

//using local strategy to check if email is already in database
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]',
    passReqToCallback: true
  }, function (req, email, password, next) {
    console.log("hello world")
    // the authentication flow on our local auth routes
    User.findOne({'email': email }, function (err, foundUser) {
  //if user is found flash message. if user isn't found, create user.
      console.log(foundUser)
      console.log("something")
      if (err) return next(err)

      if (foundUser) {
        return next(null, false, req.flash('signupMessage', 'Email has been taken'))
      } else {
        User.create(req.body.user, function (err, newUser) {
          if (err) throw err
          return next(null, false, req.flash('signupMessage', 'Sign up successful! You can now login to your account.'))
        })
      }
    })
  }))

//using local strategy to authentic user with email and password field
  passport.use('local-login', new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]',
    passReqToCallback: true
  }, function (req, email, password, next) {
    console.log('authenticating with given email and password')
    console.log(email, password)

    User.findOne({ 'email': email }, function (err, foundUser) {
      if (err) return next(err)

    //if user isn't found, flash message

      if (!foundUser)
        return next(null, false, req.flash('loginMessage', 'No user found with this email'))

      foundUser.authenticate(password, function (err, authenticated) {
        if (err) return next(err)

        //if user is found with correct password, let the person login
        if (authenticated) {
          return next(null, foundUser, req.flash('loginMessage', ''))
        } else {
          //if user is found but with wrong password, flash message
          return next(null, false, req.flash('loginMessage', 'Password don\'t match'))
        }
      })
    })
  }))
}
