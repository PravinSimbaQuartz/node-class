const authorModel = require("../model/authorModel")
const { ObjectId } = require("mongoose").Types
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const createAuthor = async function (req, res) {
    try {



        const {
            yourName,
            yourSirName,
            email,
            password,
            mobileNumber,
            isActive,
            gender
        } = req.body

        // const yourName = req.body.yourName
        // const yourSirName = req.body.yourSirName
        // const mobileNumber = req.body.mobileNumber
        // const yourName = req.body.yourName
        // const yourName = req.body.yourName
        // const yourName = req.body.yourName



        if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
            return res.status(400).send({ message: "please enter mobile number in valid form || please enter correct 10 digint number" })
        }

        // const authorData = await authorModel.create({
        // firstName,
        // lastName,
        // email,
        // password,
        // mobileNumber,
        // isActive,
        // gender
        // })

        const salt = await bcrypt.genSalt(10)
        console.log('salt', salt)

        const hashPassword = await bcrypt.hash(password, salt)
        console.log('hashPassword', hashPassword)




        const authorData = new authorModel({
            firstName: yourName,
            lastName: yourSirName,
            email: email,
            password: hashPassword,
            mobileNumber: mobileNumber,
            isActive: isActive,
            gender: gender
        })
        await authorData.save()

        res.status(201).send({ message: "Author created successfully", success: true, authorData })


    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}

const loginAuthor = async (req, res) => {
    try {
        const { email, password } = req.body



        if (!email) {
            return res.status(400).send({
                message: "Please enter email"
            })
        }
        if (!password) {
            return res.status(400).send({
                message: "Please enter password"
            })
        }

        const isExistAuthor = await authorModel.findOne({ email: email })
        console.log('isExistAuthor', isExistAuthor)


        if (!isExistAuthor) {
            return res.status(404).send({ message: "Email not found please singup then login" })
        }

        const isMatchPassword = await bcrypt.compare(password, isExistAuthor.password)
        console.log('isMatchPassword', isMatchPassword)

        if (!isMatchPassword) {
            return res.status(400).send({ message: "Incorrect password || please enter correct password" })
        }

        const createToken = jwt.sign({ authorId: isExistAuthor._id }, "secreteKey", { expiresIn: "10m" })
        res.status(200).send({ message: "Login successful", createToken })

    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}

const findAllAuther = async (req, res) => {
    try {

        // const { gender,isActive } = req.query

        // const allAuthor = await authorModel.find({gender: req.query.gender})
        // const authorCount = await authorModel.countDocuments()

        let searchcriteria = {};

        if (req.query.gender) {
            searchcriteria['$and'] = [{ gender: req.query.gender }]
        }


        if (req.query.isActive) {
            searchcriteria.isActive = req.query.isActive === "true" ? true : false
        }

        // if (req.query.isActive === "true") {
        //     searchcriteria.isActive = true
        // } else {
        //     searchcriteria.isActive = false
        // }

        if (req.query.keyword) {
            searchcriteria['$or'] = [
                { firstName: { $regex: `^${req.query.keyword.trim()}`, $options: 'i' } },
                { lastName: { $regex: `^${req.query.keyword.trim()}`, $options: 'i' } },
                { email: { $regex: `^${req.query.keyword.trim()}`, $options: 'i' } },
            ]
        }


        // and 1 1 => 1

        // or 1 1 => 1
        // 0 1 => 1
        // 1 0 => 1




        const allAuthor = await authorModel.aggregate([
            {
                $match: searchcriteria
            },
            { $sort: { createdAt: 1 } },
            {
                $lookup:
                {
                    from: "blog",
                    localField: "_id",
                    foreignField: "authorId",
                    as: "blogDetails"
                }
            },

            {
                $unwind: {
                    path: "$blogDetails",
                    preserveNullAndEmptyArrays: true

                }
            },
            {
                $lookup: {
                    from: "review",
                    localField: "blogDetails._id",
                    foreignField: "blogId",
                    as: "reviewDetails"
                }
            }
        ])



        res.status(200).send({ message: "Author data fetch successfully", allAuthor })

    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const findSingleAuthor = async (req, res) => {
    try {
        const { id } = req.params

        // const authorData = await authorModel.findOne({ _id: new ObjectId(id) })


        const authorData = await authorModel.aggregate([{
            $match: {
                _id: new ObjectId(id)
            }
        }])


        if (!authorData.length) {
            return res.status(404).send({ message: "Author not found" })
        }

        // result in array => converted into object
        res.status(200).send({ message: "Author data fetch successfully", authorData: authorData[0] })

        // res.status(200).send({ message: "Author data fetch successfully", authorData })

    } catch (error) {
        res.status(500).send({ message: error.message })

    }

}


const updateAuthor = async (req, res) => {
    try {
        // const authorId = req.params.id
        const { id } = req.params

        const { firstName,
            lastName,
            email,
            password,
            mobileNumber,
            isActive,
            gender } = req.body


        const updatedData = await authorModel.findOneAndUpdate(
            { _id: new ObjectId(id) },
            {
                firstName,
                lastName,
                email,
                password,
                mobileNumber,
                isActive,
                gender
            },
            {
                new: true
            }
        )

        if (!updatedData) {
            return res.status(404).send({ message: "Author not found" })
        }
        res.status(200).send({ message: "Author data updated successfully", updatedData })
    } catch (error) {
        res.status(500).send({ message: error.message })

    }

}


const deleteAuthor = async (req, res) => {
    try {
        const { id } = req.params

        // const isExistAuthor = await authorModel.findOne({ _id: new ObjectId(id) })
        // if (!isExistAuthor) {
        //     return res.status(404).send({
        //         message: "Author not found"
        //     })
        // }

        const deletedAuthor = await authorModel.findOneAndDelete({ _id: new ObjectId(id) })
        if (!deletedAuthor) {
            return res.status(404).send({
                message: "Author not found"
            })
        }
        res.status(200).send({ message: "Author deleted successfully" })
    } catch (error) {
        res.status(500).send({ message: error.message })

    }


}


module.exports = { createAuthor, findAllAuther, findSingleAuthor, updateAuthor, deleteAuthor, loginAuthor }



// /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)

// (!/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(password))

// create, find, findOne, findOneAndUpdate, findOneAndDelete,
// countDocuments,findById, findByIdAndUpdate, findByIdAndDelete

// find => array
// remainingQueries => Object






// const abc = {
//     age: 16,
//     number: 9876543210
// }

// const abcd = [
//     {
//         age: 16,
//         number: 9876543210
//     }
// ]

// abcd[0].number




//reset =>

//mail



//database
// findOne(email: mail)
//password

// match= oldPassword DB password

// findOneAndUpdate


// oldPassword =
// newPassword =
// confirmPassword =



// mail

// newPassword =
// confirmPassword =

// findOneAndUpdate({ email: email }, { password: newPassword }, { new: true })

// findOneAndUpdate