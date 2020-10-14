const mongoose = require('mongoose');

// Schema: decsribes the content of a database document
const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now()
        },
        tags: {
            type: [String],
        },
        body: {
            type: String,
            required: true
        }
    }
)

// Model

module.exports = Post = mongoose.model('post', PostSchema);