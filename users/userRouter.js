const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  users
  .insert(req.body)
  .then(newUsr => {
    res.status(201).json(newUser);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({message: 'Could not create user'})
  })
});

router.post('/:id/posts', (req, res) => {
  const newPost = {user_is: req.params.id, text: req.body.text};
  posts
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
  users
  .get()
  .then(user => {
    res.status(201).json(user);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({message: 'Could not get user'});
  })
});

router.get('/:id', (req, res) => {
  users
  .getById(req.params.id)
  .then(user => {
    res.status(201).json(user);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({message: 'Cound not find user'});
  })
});

router.get('/:id/posts', (req, res) => {
  const {id} = req.params;
  users
  .getUserPosts(id)
  .then(user => {
    res.status(201).json(user);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({message: 'Cannot get posts'});
  })
});

router.delete('/:id', (req, res) => {
  users
  .remove(req.params.id)
  .then(user => {
    res.status(201).json(user);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({message: 'Cannot delete user'});
  })
});

router.put('/:id', (req, res) => {
  const {id} = req.params;
  users
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
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
