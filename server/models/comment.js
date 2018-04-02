const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
  user:  { type: Schema.Types.ObjectId, ref: 'User' },
  post:  { type: Schema.Types.ObjectId, ref: 'Post' },
  comment:  String,
})

module.exports= mongoose.model('Comment', commentSchema)
