const express = require('express')
const postsRouter = require('./posts/posts-router')
const usersRouter = require('./users/users-router')

const { logger } = require('./middleware/middleware')

const server = express()

server.use(express.json())

server.use('/api/posts', logger, postsRouter)
server.use('/api/users', logger, usersRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
})

module.exports = server
