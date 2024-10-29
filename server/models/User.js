const mongoose = require('mongoose')
var Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true })
// options timeStamps
// Mongoose sẽ thêm 2 thuộc tính loại Date vào Schema, và createAt

module.exports = mongoose.model['User'] || mongoose.model('User', UserSchema);