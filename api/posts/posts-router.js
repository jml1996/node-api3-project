const express = require('express');

const { validateUserId, validateUser, validatePostId, validatePost } = require('../middleware/middleware')

const router = express.Router();

const Posts = require('./posts-model')

router.get('/', (req, res) => {
  // do your magic!
  Posts.get()
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error getting all posts',
      });
    })
});

router.get('/:id', (req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
});

router.delete('/:id', (req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
});

router.put('/:id', (req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
});

// do not forget to export the router
module.exports = router
