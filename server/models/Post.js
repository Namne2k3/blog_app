const mongoose = require('mongoose')
var Schema = mongoose.Schema;
const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true,
        unique: true
    },
    photo: {
        type: String,
        required: false,
    },
    username: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    categories: {
        type: Array
    }
}, { timestamps: true })
// options timeStamps
// Mongoose sẽ thêm 2 thuộc tính loại Date vào Schema, và createAt

module.exports = mongoose.model['Post'] || mongoose.model('Post', PostSchema);