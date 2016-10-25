var express = require('express')
var router = express.Router()

router.get('/new', function(req, res) {
  res.render('user/post')
})



module.exports = router
