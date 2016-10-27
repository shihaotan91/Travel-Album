var mongoose = require('mongoose')

var postSchema = mongoose.Schema({
    url: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    when: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    comment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    }
})

var Post = mongoose.model('Post', postSchema)

module.exports = Post
