var express = require('express')
var router = express.Router()
var passport = require('passport')

var User = require('../../models/user')


function authCheck (req, res, next) {
  // if user is not authenticated let him proceed
  // if user is authenticated then return back to profile page
  //kinda solved problem with the login middleware in app.js

  if (req.isAuthenticated()) {
    req.flash('signupMessage', '')
    console.log(req.user)
    return res.redirect('/user/profile')
  } else {
    return next()
  }
}

//getting list of people with signed up
router.get('/list', function (req, res) {
  User.find({}, function (err, allUsers) {
    // console.log(allUsers)
    res.render('user/list', {
      allUsers: allUsers
    })
  })
})

router.route('/signup')
//checking if user is already in session. if in session, don't let user in the signup/login page
      .get(authCheck, function (req, res) {
        User.find({}, function (err, allUsers) {
          res.render('user/signup', {
            // allUsers: allUsers,
            message: req.flash('signupMessage')
          })
        })
      })
      .post(passport.authenticate('local-signup', {
        successRedirect: '/user/profile',
        failureRedirect: '/user/signup',
        failureFlash: true
      }))

router.route('/login')
//checking if user is already in session. if in session, don't let user in the signup/login page
      .get(authCheck, function (req, res) {
        // console.log("dkhsbdnlkasjdbksjn")
        res.render('user/login', { message: req.flash('loginMessage') })
      })
      .post(passport.authenticate('local-login', {
        successRedirect: '/user/profile',
        failureRedirect: '/user/login',
        failureFlash: true
      }))

//creating profile page
router.get('/profile', function(req, res) {
  res.render('user/profile')
})

//creating error page
router.get('/error', function(req, res) {
  res.render('user/error')
})

//creating logout link
router.get('/logout', function (req, res) {
//.logout is a default method to exit current session. not function is not defined anywhere else
  req.logout()
  res.redirect('/')
})


module.exports = router
