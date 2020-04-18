const express = require('express');

const Users = require('./userDb');
const Posts = require('../posts/postDb');

const router = express.Router();

router.post('/', (req, res) => {
  Users
  .insert(req.body)
  .then(newUsr => {
    res.status(201).json(newUser);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({message: 'Could not create user'})
  })
});

router.post('/:id/posts', validatePost, (req, res) => {
  const newPost = {user_is: req.params.id, text: req.body.text};
  Posts
  .insert(newPost)
  .then(change => {
    res.status(201).json({change});
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({message: "Could not update user post"});
  })
});

router.get('/', (req, res) => {
  Users
  .get()
  .then(user => {
    res.status(201).json(user);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({message: 'Could not get user'});
  })
});

router.get('/:id', validateUserId, (req, res) => {
  Users
  .getById(req.params.id)
  .then(user => {
    res.status(201).json(user);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({message: 'Cound not find user'});
  })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  const {id} = req.params;
  Users
  .getUserPosts(id)
  .then(user => {
    res.status(201).json(user);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({message: 'Cannot get posts'});
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  Users
  .remove(req.params.id)
  .then(user => {
    res.status(201).json(user);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({message: 'Cannot delete user'});
  })
});

router.put('/:id', validateUserId, (req, res) => {
  const {id} = req.params;
  Users
  .updated(id, req.body)
  .then(user => {
    res.status(201).json(user);
  })
  .catch(error => {
    res.status(500).json({ message: 'Cannot edit user'});
  })
});

//custom middleware

function validateUserId(req, res, next) {
  const {id} = req.params;
  Users.getById(id)
  .then(user => {
    if(!user) {
      res.status(400).json({message: 'invalid user id'});
    } else {
      next();
    }
  })
}

function validateUser(req, res, next) {
  const body = req.body;
  switch(true) {
    case !body:
      return res.status(400).json({message: 'missing user data'});
    case !body.name:
      return res.status(400).json({message: "missing required name field"});
    default:
      return next();
  }
}

function validatePost(req, res, next) {
  const body = req.body;
  switch(true) {
    case !body:
      return res.status(400).json({message: 'missing post data'});
    case !body.text:
      return res.status(400).json({message: 'No post text'});
    default:
      return next();
  }
  
}

module.exports = router;
