const timestamp = require('time-stamp')
const Posts = require('../posts/posts-model.js')
const Users = require('../users/users-model.js')

function logger(req, res, next) {
  console.log(`method: ${req.method}`)
  console.log(`url: ${req.url}`)
  console.log(`timestamp: ${timestamp('YYYY/MM/DD:mm:ss:ms')}`)
  next()
}

async function validateUserId(req, res, next) {
  // do your magic!
  console.log('checking user id')
  try {
    const user = await Users.getById(req.params.id)
    if (user) {
      req.user = user
      next()
    } else {
      res.status(404).json(`User with id ${req.params.id} not found.`)
    }
  } catch (error) {
    res.status(500).json('Error getting user by id.')
  }
}

function validateUser(req, res, next) {
  // do your magic!
  console.log('checking user request body')
  if (!req.body.name) {
    res.status(400).json({ error: "name required field" })
  } else {
    next()
  }
}

function validatePostId(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

// do not forget to expose these functions to other modules
module.exports = { logger, validateUserId, validateUser, validatePostId, validatePost }