var express = require('express')
var router = express.Router()

var User = require('../../models/signup')

router.get('/list', function (req, res) {
  User.find({}, function (err, allUsers) {
    console.log(allUsers)
    res.render('user/list', {
      allUsers: allUsers
    })
  })
})

router.get('/signup', function(req, res) {
  res.render('user/signup')
})

router.get('/login', function(req, res) {
  res.render('user/login')
})

router.get('/list', function(req, res) {
  res.render('user/list')
})

module.exports = router
