const express = require('express')
const cmtRouter = express.Router();
const { createComment, updateComment, deleteComment, getPostComment } = require('../controller/commentController')
const verifyToken = require('../verifyToken')

// create
cmtRouter.post('/create', verifyToken, createComment)

// update
cmtRouter.put('/:id', verifyToken, updateComment)

// delete
cmtRouter.delete('/:id', verifyToken, deleteComment)

// get Post's comments
cmtRouter.get('/post/:postId', getPostComment)

// export
module.exports = cmtRouter;