const Post = require('../models/Post')
const Comment = require('../models/Comment')

const createPost = async (req, res) => {
    try {
        const newPost = new Post(req.body)
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    } catch (err) {
        res.status(500).json(err);
    }
}

const updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedPost)
    } catch (err) {
        res.status(500).json(err);
    }
}

const deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        await Comment.deleteMany({ postId: req.params.id })

        res.status(200).json("Post has been deleted!");
    } catch (err) {
        res.status(500).json(err);
    }
}

const getPost = async (req, res) => {
    try {
        const findPost = await Post.findById(req.params.id);
        res.status(200).json(findPost);
    } catch (err) {
        res.status(500).json(err);
    }
}

const getAllPost = async (req, res) => {
    try {
        const searchFilter = {
            title: { $regex: req.query.search, $options: "i" }
        }

        const posts = await Post.find(req.query.search && searchFilter)
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
}

const getUserPost = async (req, res) => {
    try {
        const findUserPosts = await Post.find({ userId: req.params.userId })
        res.status(200).json(findUserPosts);
    } catch (err) {
        res.status(500).json(err);
    }
}


module.exports = {
    createPost,
    updatePost,
    deletePost,
    getPost,
    getAllPost,
    getUserPost,
}

// verify JWT Token