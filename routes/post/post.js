var express = require('express')
var router = express.Router()

var Post = require('../../models/post')

function reverseCheck (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  } else {
    return res.redirect('/user/login')
  }
}

router.route('/new')
  .get(reverseCheck, function (req, res) {
    res.render('post/new')
  })

router.get('/all', function(req, res) {
  Post.find({}, function(err, postArr) {
    console.log(postArr)

    res.render('post/all', {
      postArr: postArr,
    })
  })
})



router.get('/all', function (req, res) {
  res.render('post/all')
})

router.post('/new', function (req,res) {
    console.log("hello")
    console.log(req.user.id)
    var newPost = new Post ({
      url: req.body.post.url,
      country: req.body.post.country,
      who: req.body.post.who,
      user_id: req.user.id.name,
    })

     newPost.save(function (err) {
      if (err) throw new Error(err)

      res.redirect('/post/all')
      console.log(req.user)
      })

  })

  // Post.create(req.body.post,
  // function(err, newPost){
  //   res.redirect('/post/all')
  //   console.log(req.user)

//     newAnimal.save(function (err) {
//       if (err) throw new Error(err)
//     })

//   .post('/', function (req, res) {
//   Post.create(req.body.post, function (err, newPost) {
//     res.redirect('/')
//   }
// }))

module.exports = router
