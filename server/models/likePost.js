const mongoose = require('mongoose')
const Schema = mongoose.Schema

const likePostSchema = new Schema({
  user:  { type: Schema.Types.ObjectId, ref: 'User' },
  post:  { type: Schema.Types.ObjectId, ref: 'Post' },
})

module.exports= mongoose.model('LikePost', likePostSchema)
