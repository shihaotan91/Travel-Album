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

          // console.log(postArr)

        res.render('post/all', {
          postArr: postArr,
      })
    })
  })

router.route('/new')
  .get(reverseCheck, function (req, res) {
    res.render('post/new')
  })

//   router.get('/all', function (req, res) {
//   Post.find({}, function (err, postArr) {
//     res.render('post/all', {
//       postArr: postArr,
//     })
//   })
// })


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






// router.get('/:id', function(req, res) {
//      Post.find({})
//     .populate('user_id')
//     // .populate('comment_id')
//
//         .exec(function(err, postArr) {
//
//           // console.log(postArr)
//
//         res.render('post/all', {
//           postArr: postArr,
//           // commentArr: commentArr
//           // commentArr: commentArr
//           // username:username,
//         // })
//       })
//     })
//   })

//   router.get('/all', function (req, res) {
//   Post.findAll({}, function (err, foundPost) {
//     // console.log("lalallala")
//     if (err) console.log(err)
//     Comment.findAll({post_id : req.params.id}, function(err, commentArr){
//       // console.log(commentArr)
//       res.render('post/all', {
//         commentArr: commentArr
//       })
//     })
//   })
// })

// router.get('/:id', function (req, res) {
//   res.render('post/all')
// })

// router.get('/:id', function (req, res) {
//   res.redirect('/post/all')
// })

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

  //  router.get('/:id', function(req, res) {
  //       Comment.find({})
  //      .populate('user_id')
  //      // .populate('comment_id')
   //
  //          .exec(function(err, commentArr) {
   //
  //            // console.log(postArr)
   //
  //          res.render('post/all', {
  //            commentArr: commentArr
  //            // commentArr: commentArr
  //            // username:username,
  //          // })
  //        })
  //      })
  //    })



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
