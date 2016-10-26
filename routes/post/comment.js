// var express = require('express')
// var router = express.Router()
//
// var Comment = require('../../models/comment')
//
// router.get('/all', function(req, res) {
//   Post.find({})
//       .populate('user_id')
//       .exec(function(err, commentArr) {
//         // console.log(commentArr)
//
//     // User.findById(req.user.id, function (err, user){
//     //   var username = user.name
//       // console.log(user)
//       res.render('post/all', {
//         commentArr: commentArr,
//         // username:username,
//       // })
//     })
//   })
// })
//
// router.post('/all', function (req,res) {
//     var newComment = new Comment ({
//       comment: req.body.comment.comment,
//       post_id: req.post.id,
//       user_id: req.user.id,
//       // username: req.user.name
//     })
//
//     //  console.log(req.user.name)
//
//      newComment.save(function (err) {
//       if (err) throw new Error(err)
//
//       res.redirect('/post/all')
//       // console.log(req.user)
//
//       })
//    })
//
//    module.exports = router
