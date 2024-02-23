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
        type: mongoose.Schema.Types.ObjectId,
        ref: "blog"
    }]

},
    { timestamps: true }
)


module.exports = new mongoose.model("author", authorSchema, "author")





//GYM

// trainer => name, age, email, password, phoneNumber, address => [userId], [departmentId], [dietId]
// user => name, age, email, password, phoneNumber, address, fees => [trainerId], [dietId], [department]
// diet => eggs,milk => [trainerId]
// equipments => dumbles etc
// department => [subscriptionId]
// subscription => 1 ,2,3,4,5,6,7,8,9,10



//School
// students => name, age, email, password, phoneNumber, address => [classId], [teacherId]
// teachers => name, age, email, password, phoneNumber, address => [classId]
// class=> standard, div => 
// department => departmentName


//Library managements  
//books => name / title, description, category, subcategory,price, stocks,  [writerId]
//reviews=> rating, reviewersName, [bookId]
//users => name, email, password, phoneNumber, address, roles=> (user, writer) 
//orders=> bookId,userId


