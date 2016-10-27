var express = require('express')
var router = express.Router()

//frontpage of website

router.get('/', function(req, res) {
  res.render('home/home')
})

module.exports = router
