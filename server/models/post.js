const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
  photo:  String,
  caption: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' }},
  { toJSON: { virtuals: true } }
)
postSchema.virtual('likes', {
  ref: 'LikePost', // The model to use
  localField: '_id', // Find people where `localField`
  foreignField: 'post', // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: false
});

module.exports = mongoose.model('post', postSchema)
