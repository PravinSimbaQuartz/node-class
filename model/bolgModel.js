const mongoose = require('mongoose')


const blogSchema = new mongoose.Schema({

    title: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: mongoose.Schema.Types.String,
    },

    category: {
        type: mongoose.Schema.Types.String
    },

    subCategory: [{
        type: mongoose.Schema.Types.String
    }],

    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "author"

    }
},
    {
        timestamps: true,
    })



module.exports = mongoose.model("blog", blogSchema, "blog")



