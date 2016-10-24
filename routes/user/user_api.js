var express = require('express')
var router = express.Router()

var User = require('../../models/signup')

router.get('/', function (req, res) {
  User.find({}, function (err, allUsers) {
    res.json(allUsers)
  })
})

router.post('/', function (req, res) {
  User.create(req.body.user, function (err, newUser) {
    // console.log("dasjkgdksad")
    res.json(newUser)
  })
})

module.exports = router
