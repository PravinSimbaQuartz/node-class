const demoModels = require("../model/demoModel.js")
const { ObjectId } = require("mongoose").Types



const createDemoData = async function (req, res) {
    // completely execute this line then jump to the next line

    // const firstName = req.body.firstName
    // const lastName = req.body.lastName
    // const email = req.body.email
    // const firstName = req.body.firstName
    // const firstName = req.body.firstName



    const { firstName,
        lastName,
        email,
        password,
        address,
        mobileNumber,
        age,
        isActive } = req.body
    //destructure

    if (!email) {
        return res.send({ message: "Please enter email" })
    }

    if (!mobileNumber) {
        return res.send({ message: "Please enter mobile number" })
    }


    const demoData = await demoModels.create({
        firstName,
        lastName,
        email,
        password,
        address,
        mobileNumber,
        age,
        isActive
    })
    res.send({ message: "profile created successfully", success: true, demoData })

}


const findAllUsers = async function (req, res) {

    const { age } = req.query

    const findData = await demoModels.find({ age: age })

    res.send({ message: "User get successfully", findData })
}


// const getSingleUser = async (req, res) => {

//     // const { emailaaaaa } = req.query

//     const { age } = req.query

//     const data = await demoModels.findOne({ age: age })
//     if (!data) {
//         return res.send({ message: "email not found" })
//     }
//     res.send({ message: "data fetch successfully", data })

// }


const getSingleUser = async (req, res) => {

    const { id } = req.params

    console.log('id', typeof (id))

    const data = await demoModels.findById({ _id: (id) })
    if (!data) {
        return res.send({ message: "email not found" })
    }
    res.send({ message: "data fetch successfully", data })

}



// module.exports = createDemoData
// module.exports = findAllUsers

module.exports = { createDemoData, findAllUsers, getSingleUser }
