const Post = require('../models/post')
const LikePost = require('../models/likePost')

module.exports = {
  myPost (req, res) {
    Post.find({user: req.user._id}).populate('user').populate({path: 'comments',populate: {path: 'user'}}).populate('likes').exec(function (err, data) {
      if(err) return res.status(500).json({ message: err })
      return res.status(200).json({
        message: "Success Read My Post",
        data
      })
    })
  },
  index (req, res) {
    Post.find({}).populate('user').populate('likes').populate({path: 'comments',populate: {path: 'user'}}).exec(function (err, data) {
      if(err) return res.status(500).json({ message: err })
      return res.status(200).json({
        message: "Success Read All Post",
        data
      })
    })
  },
  findOne (req, res) {
    Post.findOne({_id: req.params.id}).populate('user').exec(function (err, data) {
      if(err) return res.status(500).json({ message: err })
      return res.status(200).json({
        message: "Success Read a Post",
        data
      })
    })
  },
  create (req, res) {
    const { caption } = req.body
    const user = req.user._id
    const photo =  req.file.cloudStoragePublicUrl
    const input = { photo, caption, user }
    Post.create(input, function (err, data) {
      if (err) return res.status(500).json({message: err})
      res.status(201).json({
        message: "Success Add new Post",
        data
      })
    })
  },
  like (req, res) {
    const user = req.user._id
    const id = req.params.id
    const post = id
    Post.findOne({_id: req.params.id, user: user}).exec(function (err, data) {
      if(err) return res.status(500).json({ message: err })
      if (data) {
        return res.status(200).json({
          message: "Cannot Like your own photo",
          data
        })
      } else {
        LikePost.findOne({user, post}).exec(function (err, data) {
          if(err) return res.status(500).json({ message: err })
          if (data) {
            LikePost.findOneAndRemove({_id: data._id}, function (err, data) {
              if(err) return res.status(500).json({ message: err })
              return res.status(200).json({
                message: "Success Unlike a Post",
                data
              })
            })
          } else {
            LikePost.create({ user, post}, function (err, data) {
              if(err) return res.status(500).json({ message: err })
              return res.status(200).json({
                message: "Success Like a Post",
                data
              })
            })
          }
        })
      }
    })
  },
  update (req, res) {
    const { caption } = req.body
    const user = req.user._id
    const id = req.params.id
    const input = { caption, user }
    Post.findOne({_id: id}).exec(function (err, data) {
      if(err) return res.status(500).json({ message: err })

      if (data && data.user == user) {
        Post.findOneAndUpdate({_id: id}, input, { new: true }, function (err, data) {
          if(err) return res.status(500).json({ message: err })
          return res.status(200).json({
            message: "Success Update a Post",
            data
          })
        })
      } else {
        return res.status(403).json({
          message: "Cannot Update, No Authorization",
        })
      }
    })
  },
  destroy (req, res) {
    const user = req.user._id
    const id = req.params.id
    Post.findOne({_id: id}).exec(function (err, data) {
      if(err) return res.status(500).json({ message: err })
      console.log(user)
      if (data && data.user == user) {
        Post.findOneAndRemove({_id: id}, function (err, data) {
          if(err) return res.status(500).json({ message: err })
          return res.status(200).json({
            message: "Success Delete a Post",
            data
          })
        })
      } else {
        return res.status(403).json({
          message: "Cannot Delete, No Authorization",
        })
      }
    })
  }

}
