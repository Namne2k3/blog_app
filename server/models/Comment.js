const mongoose = require('mongoose')
var Schema = mongoose.Schema;
const CommentSchema = new Schema({
    comment: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    postId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true
    }
}, { timestamps: true })
// options timeStamps
// Mongoose sẽ thêm 2 thuộc tính loại Date vào Schema, và createAt

module.exports = mongoose.model['Comment'] || mongoose.model('Comment', CommentSchema);