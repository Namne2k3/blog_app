const configApp = require('./config/appConfig')
const express = require('express');
const app = express();
const connectDB = require('./database/connectDB')
const { AuthRouter, UserRouter, postRouter, cmtRouter } = require('./routes')
const path = require('path')
const multer = require('multer')
// middlewares
require('dotenv').config()

configApp(app);

app.use('/api/auth', AuthRouter)
app.use('/api/users', UserRouter)
app.use('/api/posts', postRouter)
app.use('/api/comments', cmtRouter)
app.use("/images", express.static(path.join(__dirname, "/images")))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // specify  the directory where you want to store uploaded files
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        // Specify the filename for the uploaded file
        cb(null, req.body.img)
    }
})



const upload = multer({ storage: storage })
app.post('/api/upload', upload.single('file'), (req, res) => {
    res.status(200).json("Image has been uploaded successfully!")
})



app.listen(process.env.WEB_PORT, async () => {
    await connectDB();
    // console.log(__dirname);s
    console.log('App is running on port', process.env.WEB_PORT)
})