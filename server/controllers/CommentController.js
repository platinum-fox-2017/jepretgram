const Comment = require('../models/comment')
module.exports = {
  create (req, res) {
    const { comment, post } = req.body
    const user = req.user._id
    const input = { post, comment, user }
    Comment.create(input, function (err, data) {
      if (err) return res.status(500).json({message: err})
      res.status(201).json({
        message: "Success Add new Comment",
        data
      })
    })
  }
}
