const express = require('express')

const { validatePostId } = require('../middleware/middleware')

const router = express.Router()

const Posts = require('./posts-model')

router.get('/', (req, res) => {
  Posts.get()
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: 'Error getting all posts',
      })
    })
})

router.get('/:id', validatePostId, (req, res) => {
  res.status(200).json(req.post)
})

router.delete('/:id', validatePostId, (req, res) => {
  Posts.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: `post with id ${req.params.id} deleted`})
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: 'Error deleting post',
      })
    })
})

router.put('/:id', validatePostId, (req, res) => {
  Posts.update(req.params.id, req.body)
    .then(() => {
      res.status(200).json({ message: `Post with id ${req.params.id} updated` })
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: 'Post update failed'
      })
    })
})

module.exports = router
