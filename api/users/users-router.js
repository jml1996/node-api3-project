const express = require('express');

const { validateUserId, validateUser, validatePostId, validatePost } = require('../middleware/middleware')

const router = express.Router();

const Users = require('./users-model')
const Posts = require('../posts/posts-model')

router.post('/', validateUser, (req, res) => {
  // do your magic!
  // this needs a middleware to check that the request body is valid
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
  // do your magic!
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
  // do your magic!
  // this needs a middleware to verify user id
  res.status(200).json(req.user)
  // Users.getById(req.params.id)
  //   .then(user => {
  //     res.status(200).json(user)
  //   })
  //   .catch(error => {
  //     console.log(error)
  //     res.status(500).json({
  //       message: 'Error getting user.'
  //     })
  //   })
})

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  Users.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: `User with id ${req.params.id} has been deleted` })
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: "Error deleting user"
      })
    })
})

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Users.update(req.params.id, req.body)
    .then(updated => {
      res.status(200).json({ message: `User with id ${req.params.id} updated` })
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: "User update failed"
      })
    })
})

// What exactly is being posted here?
// ***********************
router.post('/:id/posts', validateUserId, validateUser, (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid

  Posts.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: "Error adding new post for the given user"
      })
    })
})

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  Users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: "Error getting user posts"
      })
    })
})

// do not forget to export the router
module.exports = router
