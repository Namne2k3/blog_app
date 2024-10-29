const express = require('express')
const Comment = require('../models/Comment')
const User = require('../models/User')
const Post = require('../models/Post')

const createComment = async (req, res) => {
    try {
        const newComment = await new Comment(req.body);
        const savedComment = await newComment.save();

        res.status(200).json(savedComment);
    } catch (err) {
        res.status(500).json(err)
    }
}

const updateComment = async (req, res) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedComment)
    } catch (err) {
        res.status(500).json(err)
    }
}

const deleteComment = async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json("Comment has been deleted!")
    } catch (err) {
        res.status(500).json(err)
    }
}

const getPostComment = async (req, res) => {
    try {
        const postComments = await Comment.find({ postId: req.params.postId })
        res.status(200).json(postComments)
    } catch (err) {
        res.status(500).json(err)
    }
}

const getUserComment = async (req, res) => {
    try {
        const userComments = await Comment.find({ userId: req.params.userId })
        res.status(200).json(userComments)
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = {
    createComment,
    updateComment,
    deleteComment,
    getPostComment,
    getUserComment
}