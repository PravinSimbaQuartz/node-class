const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    // title: {
    //     type: mongoose.Schema.Types.String,
    //     enum: ["Mr", "Mrs", "Miss"]
    // },

    firstName: {
        type: mongoose.Schema.Types.String,
    },
    lastName: {
        type: mongoose.Schema.Types.String,
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    mobileNumber: {
        type: mongoose.Schema.Types.Number,
        required: true,
        unique: true
    },
    isActive: {
        type: mongoose.Schema.Types.Boolean,

    },
    gender: {
        type: mongoose.Schema.Types.String,
        enum: ["male", "female", "other"]
    },

    addresss: [{
        type: Object,

    }]

},
    { timestamps: true }
)


module.exports = new mongoose.model("author", authorSchema, "author")