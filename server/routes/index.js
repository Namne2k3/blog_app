const AuthRouter = require('./auth')
const cmtRouter = require('./comments')
const UserRouter = require('./users')
const postRouter = require('./posts')

module.exports = {
    AuthRouter,
    cmtRouter,
    UserRouter,
    postRouter
}