const express = require('express')
const postRouter = express.Router();
const { createPost, updatePost, deletePost, getPost, getAllPost, getUserPost, searchPosts } = require('../controller/postController')
const verifyToken = require('../verifyToken')

// create
postRouter.post('/create', verifyToken, createPost)

// update
postRouter.put('/:id', verifyToken, updatePost)

// delete
postRouter.delete('/:id', verifyToken, deletePost)

// get
postRouter.get('/:id', getPost)

// get posts
postRouter.get('/', getAllPost)

// get user's posts
postRouter.get('/user/:userId', getUserPost)

// export
module.exports = postRouter;