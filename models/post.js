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
    who: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
})

var Post = mongoose.model('Post', postSchema)

module.exports = Post