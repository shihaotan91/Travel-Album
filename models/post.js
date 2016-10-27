var mongoose = require('mongoose')

//changed drop down list of 'who' with when with Number type

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
      type: Number,
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
