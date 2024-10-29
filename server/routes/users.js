const express = require('express')
const userRouter = express.Router()
const { updateUser, deleteUser, getUser } = require('../controller/userController')
const verifyToken = require('../verifyToken')

// Update
userRouter.put("/:id", verifyToken, updateUser)

// Delete
userRouter.delete("/:id", verifyToken, deleteUser)

// Get User
userRouter.get("/:id", getUser)

// export
module.exports = userRouter;