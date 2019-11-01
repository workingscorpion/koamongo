const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'name is required'
  }
});

module.exports = FriendSchema;
