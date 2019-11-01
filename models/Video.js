// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: 'FileURL is required!'
  },
  title: {
    type: String,
    required: 'Title is required!'
  },
  description: String,
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment' //Comment 모델 참조
    }
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: 'Creator is required!',
    ref: 'User' //User 모델 참조
  }
});

module.exports = VideoSchema;
