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
  console.log('checking user id')
  try {
    const user = await Users.getById(req.params.id)
    if (user) {
      req.user = user
      next()
    } else {
      res.status(404).json({ message: `User with id ${req.params.id} not found.` })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error getting user by id.' })
  }
}

function validateUser(req, res, next) {
  console.log('checking user request body')
  if (!req.body.name) {
    res.status(400).json({ message: "name required field" })
  } else {
    next()
  }
}

async function validatePostId(req, res, next) {
  console.log('checking post id')
  try {
    const post = await Posts.getById(req.params.id)
    if (post) {
      req.post = post
      next()
    } else {
      res.status(404).json({ message: `Post with id ${req.params.id} not found.` })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error getting post by id.' })
  }
}

function validatePost(req, res, next) {
  console.log('checking post request body')
  if (!req.body) {
    res.status(400).json({ message: "missing post data" })
  } else if (!req.body.text) {
    res.status(400).json({ message: "text required field" })
  } else {
    next()
  }
}

module.exports = { logger, validateUserId, validateUser, validatePostId, validatePost }
