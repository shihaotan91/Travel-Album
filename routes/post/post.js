var express = require('express')
var router = express.Router()

var Post = require('../../models/post')
var User = require('../../models/user')
var Comment = require('../../models/comment')

function reverseCheck (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  } else {
    return res.redirect('/user/error')
  }
}

router.get('/all', function(req, res) {
     Post.find({})
    .populate('user_id')
        .exec(function(err, postArr) {

        res.render('post/all', {
          postArr: postArr,
      })
    })
  })

router.route('/new')
  .get(reverseCheck, function (req, res) {
    res.render('post/new')
  })

  router.route('/myphotos')
    .get(reverseCheck, function (req, res) {
     Post.find({
     user_id: req.user._id
  }, function(err, allPhotos) {
    // console.log(allListings)
    res.render('post/myphotos', {
      user: req.user.name,
      allPhotos: allPhotos,
    })
  })
});

router.delete('/myphotos/:id', function(req, res) {
Post.findByIdAndRemove(req.params.id, function(err, allPosts){
    if (err) { throw new Error (err)
      // console.log("cannot delete")
      res.render('/post/myphotos')
    } else {
      // console.log("deleted")
      res.redirect('/post/myphotos')
    }
  })
})

router.get('/:id', function (req, res) {
  Post.findById(req.params.id)
    .populate('user_id', 'name')
    .exec(function (err, foundPost) {
    if (err) console.log(err)
    Comment.find({post_id : req.params.id}, function(err, commentArr){
      res.render('post/each', {
        foundPost: foundPost,
        commentArr: commentArr
      })
    })
  })
})



router.post('/new', function (req,res) {
    var newPost = new Post ({
      url: req.body.post.url,
      country: req.body.post.country,
      who: req.body.post.who,
      user_id: req.user.id,
      // comment_id: req.comment.id,
      // username: req.user.name
    })

    //  console.log(req.user.name)

     newPost.save(function (err) {
      if (err) throw new Error(err)

      res.redirect('/post/all')
      // console.log(req.user)

      })
   })

   router.post('/:id', function (req,res) {
     var newComment = new Comment ({
         name: req.body.comment.name,
         comment: req.body.comment.comment,
         post_id: req.params.id,
        //  user_id: req.user.id,
       })
       //  console.log(req.user.name)

        newComment.save(function (err) {
         if (err) throw new Error(err)

       })
          console.log("test")
         res.redirect('/post/' + req.params.id)

         // console.log(req.user)

      })


module.exports = router
