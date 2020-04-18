const express = require('express');

const Posts = require('../posts/postDb');

const router = express.Router();

router.get('/', (req, res) => {
  Posts
  .get()
  .then(posts => {
    res.status(201).json(posts);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({message: 'Could not get posts'});
  })
});

router.get('/:id', validatePostId, (req, res) => {
  Posts
  .getById(id)
  .then(post => {
    res.status(201).json(post);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ message: 'Error getting ID'});
  })
});

router.delete('/:id', validatePostId, (req, res) => {
  const {id} = req.params;
  Posts
  .remove(id)
  .then(post => {
    res.status(201).json(post);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({message: 'Could not delete post'});
  })
});

router.put('/:id', validatePostId, (req, res) => {
  const {id} = req.params;
  const response = req.body;
  Posts
  .update(id, response)
  .then(response => {
    console.log(error);
    res.status(500).json({message: 'Could not update post'});
  })
});

// custom middleware

function validatePostId(req, res, next) {
  const {id} = req.params;
  posts.getById(id)
  .then(post => {
    if (!post) {
      return res.status(400).json({message: 'No post found'});
    } else {
      next();
    }
  });
}

module.exports = router;
