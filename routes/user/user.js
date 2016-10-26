var express = require('express')
var router = express.Router()
var passport = require('passport')

var User = require('../../models/user')


function authCheck (req, res, next) {
  // if req.isAuthenticated is false, then let it be
  // if it's true, redirect back to profile

  if (req.isAuthenticated()) {
    req.flash('signupMessage', '')
    console.log(req.user)
    return res.redirect('/user/profile')
  } else {
    return next()
  }
}

router.get('/list', function (req, res) {
  User.find({}, function (err, allUsers) {
    console.log(allUsers)
    res.render('user/list', {
      allUsers: allUsers
    })
  })
})

router.route('/signup')
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
      .get(authCheck, function (req, res) {
        // console.log("dkhsbdnlkasjdbksjn")
        res.render('user/login', { message: req.flash('loginMessage') })
      })
      .post(passport.authenticate('local-login', {
        successRedirect: '/user/profile',
        failureRedirect: '/user/login',
        failureFlash: true
      }))


// router.get('/signup', function(req, res) {
//   res.render('user/signup')
// })
//
// router.get('/login', function(req, res) {
//   res.render('user/login')
// })

router.get('/list', function(req, res) {
  res.render('user/list')
})

router.get('/profile', function(req, res) {
  res.render('user/profile')
})

router.get('/error', function(req, res) {
  res.render('user/error')
})

router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})


module.exports = router
