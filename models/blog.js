const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// define the schema 
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
}, { timestamps: true });

// create model based on the defined schema
// the name must be singular of the collection name
const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;