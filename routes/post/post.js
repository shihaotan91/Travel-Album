var express = require('express')
var router = express.Router()

var Post = require('../../models/post')
var User = require('../../models/user')
var Comment = require('../../models/comment')

//if user is authenticated, proceed. if user is not authenticated, redirect to error page.

function reverseCheck (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  } else {
    return res.redirect('/user/error')
  }
}

//rendering all post on /all page with postArr array
router.get('/all', function(req, res) {
     Post.find({})
    .populate('user_id')
        .exec(function(err, postArr) {

        res.render('post/all', {
          postArr: postArr,
      })
    })
  })

//same thing but in Grid format
  router.get('/allGrid', function(req, res) {
       Post.find({})
      .populate('user_id')
          .exec(function(err, postArr) {

          res.render('post/allGrid', {
            postArr: postArr,
        })
      })
    })

//performing reverse check on /post/new page
router.route('/new')
  .get(reverseCheck, function (req, res) {
    res.render('post/new')
  })

//performing reverse check on /post/myphotos page
  router.route('/myphotos')
    .get(reverseCheck, function (req, res) {
     Post.find({
    //finding specific user id to display photos ONLY posted by that ID. for profile page
     user_id: req.user._id
  }, function(err, allPhotos) {
    // rendering specific photos by logged in user
    res.render('post/myphotos', {
      user: req.user.name,
      allPhotos: allPhotos,
    })
  })
});

//find photos by ID for delete function
router.delete('/myphotos/:id', function(req, res) {
Post.findByIdAndRemove(req.params.id, function(err, allPosts){
    if (err) { throw new Error (err)
      // console.log("test test error")
      res.render('/post/myphotos')
    } else {
      res.redirect('/post/myphotos')
    }
  })
})

//find photos by ID for edit function
router.get('/:id/edit', function(req, res) {
   Post.findById(req.params.id, function(err, foundPost) {
     res.render('post/edit', {
       foundPost: foundPost,
       user: req.user.name,
   })
 })
})

//find photos by ID for edit function
router.put('/:id/edit', function(req, res) {
 var editPost = req.body.post;
 Post.findByIdAndUpdate(req.params.id, editPost, function(err, post) {
   if (err) throw new Error(err);
   res.redirect('/post/myphotos');
 })
})


//populate the user field in POST and save the username to it. So it can display who is the person that took the picture.
router.get('/:id', function (req, res) {
  Post.findById(req.params.id)
  //.populate has two field, one is to choose the foreign key to populate, another is to choose the specific property in foreign key
    .populate('user_id', 'name')
  //RMB TO EXEC after populating if not population wont work
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

//creating new post using the .save method
//.create method DOESN'T work because you need to req.user.id.
router.post('/new', function (req,res) {
    var newPost = new Post ({
      url: req.body.post.url,
      country: req.body.post.country,
      when: req.body.post.when,
      user_id: req.user.id,
    })

    //  console.log(req.user.name)

     newPost.save(function (err) {
      if (err) throw new Error(err)

      res.redirect('/post/all')
      // console.log(req.user)

      })
   })

 //creating new comment and referencing it to the postID
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
