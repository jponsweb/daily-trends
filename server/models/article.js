const mongoose = require('mongoose');

const Article = mongoose.model('Article', {
    title: {
        type: String,
        required: true
    },

    body: {
        type: String,
        required: true
    },

    image: { 
        type: String,
        required: true 
        },

    source: { 
        type: String,
        required: true 
    },

    publisher: { 
        type: String,
        required: true 
    }
});


module.exports = Article