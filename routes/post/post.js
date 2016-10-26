var express = require('express')
var router = express.Router()

var Post = require('../../models/post')
var User = require('../../models/user')
var Comment = require('../../models/comment')

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
     Post.find({})
    .populate('user_id')
    // .populate('comment_id')

        .exec(function(err, postArr) {

          // console.log(postArr)

        res.render('post/all', {
          postArr: postArr
          // commentArr: commentArr
          // username:username,
        // })
      })
    })
  })


router.get('/all', function (req, res) {
  res.render('post/all')
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

   router.get('/:id', function(req, res) {
        Comment.find({})
       .populate('user_id')
       // .populate('comment_id')

           .exec(function(err, commentArr) {

             // console.log(postArr)

           res.render('post/all', {
             commentArr: commentArr
             // commentArr: commentArr
             // username:username,
           // })
         })
       })
     })



   router.post('/:id', function (req,res) {
     var newComment = new Comment ({
         comment: req.body.comment.comment,
         post_id: req.params.id,
         user_id: req.user.id,
         // username: req.user.name
       })

       //  console.log(req.user.name)

        newComment.save(function (err) {
         if (err) throw new Error(err)

         res.redirect('/post/all')
         // console.log(req.user)

        })
      })


      // })
      // .populate('user_id', 'name')
      // .exec(function (err, story) {
      //   if (err) return handleError(err);
      //
      //   console.log('The name is', User.user_id.name);



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
