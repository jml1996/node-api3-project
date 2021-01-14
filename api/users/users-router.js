const express = require('express');

const { validateUserId, validateUser, validatePost } = require('../middleware/middleware')

const router = express.Router();

const Users = require('./users-model')
const Posts = require('../posts/posts-model')

router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: 'Error posting new users',
      })
    })
})

router.get('/', (req, res) => {
  Users.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: 'Error getting all users',
      })
    })
})

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user)
})

router.delete('/:id', validateUserId, (req, res) => {
  Users.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: `User with id ${req.params.id} has been deleted` })
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: 'Error deleting user'
      })
    })
})

router.put('/:id', validateUserId, validateUser, (req, res) => {
  Users.update(req.params.id, req.body)
    .then(updated => {
      res.status(200).json({ message: `User with id ${req.params.id} updated` })
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: 'User update failed'
      })
    })
})

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // Bit of a hack in the arg of .insert, but I can explain
  Posts.insert({ text: `${req.body.text}`, user_id: `${req.params.id}`})
    .then(user => {
      res.status(201).json(user)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: 'Error adding new post for the given user'
      })
    })
})

router.get('/:id/posts', validateUserId, (req, res) => {
  Users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: 'Error getting user posts'
      })
    })
})

module.exports = router
