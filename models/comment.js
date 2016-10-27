var mongoose = require('mongoose')

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
