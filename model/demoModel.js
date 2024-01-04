const mongoose = require('mongoose');

const DemoSchema = new mongoose.Schema({
    firstName: {
        type: mongoose.Schema.Types.String,
        lowercase: true
    },
    lastName: {
        type: mongoose.Schema.Types.String,
        uppercase: true,
        trim: true
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,

    },
    password: {
        type: mongoose.Schema.Types.String,
    },
    address: {
        type: mongoose.Schema.Types.String,
    },
    mobileNumber: {
        type: mongoose.Schema.Types.Number,
        required: true,
        unique: true,
    },
    age: {
        type: mongoose.Schema.Types.Number,
    },
    isActive: {
        type: mongoose.Schema.Types.Boolean,
    }
})



module.exports = new mongoose.model("demo", DemoSchema, "demo")