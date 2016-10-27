var mongoose = require('mongoose')

//took out user_id to allow anonymous commenting

var commentSchema = mongoose.Schema({
    comment: {
      type: String,
      required: true,
    },
     name: {
      type: String,
      required: true,
    },
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    }
})

var Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
