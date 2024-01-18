const mongoose = require('mongoose')


const reviewSchema = new mongoose.Schema({
    reviewerName: { type: mongoose.Schema.Types.String, default: 'Guest' },
    rating: {
        type: mongoose.Schema.Types.Number,
        required: true
    },

    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    feedback: {
        type: mongoose.Schema.Types.String,
    }

})


module.exports = mongoose.model("review", reviewSchema, "review")