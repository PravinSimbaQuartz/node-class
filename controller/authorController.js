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
            gender,
            addresss
        } = req.body

        // const yourName = req.body.yourName
        // const yourSirName = req.body.yourSirName
        // const mobileNumber = req.body.mobileNumber
        // const yourName = req.body.yourName
        // const yourName = req.body.yourName
        // const yourName = req.body.yourName

        // const { array } = req.body
        // console.log(111111, array)

        // for (let i of array) {

        //     const salt = await bcrypt.genSalt(10)
        //     console.log('salt', salt)

        //     const hashPassword = await bcrypt.hash(i.password, salt)
        //     console.log('hashPassword', hashPassword)
        //     const authorData = new authorModel({
        //         firstName: i.yourName,
        //         lastName: i.yourSirName,
        //         email: i.email,
        //         password: hashPassword,
        //         mobileNumber: i.mobileNumber,
        //         isActive: i.isActive,
        //         gender: i.gender,
        //         addresss: i.addresss
        //     })
        //     await authorData.save()

        // }



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
            gender: gender,
            addresss: addresss
        })
        await authorData.save()

        const Object = {
            _id: authorData._id,
            firstName: authorData.firstName,
            lastName: authorData.lastName,
            email: authorData.email,
            mobileNumber: authorData.mobileNumber,
            isActive: authorData.isActive,
            gender: authorData.gender,
            __v: authorData.__v,
            addresss: authorData.addresss,
        }

        res.status(201).send({ message: "Author created successfully", success: true, authorData: Object })


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

        // const allAuthor = await authorModel.find().select({ password: 0, firstName: 0 })
        // res.status(200).send({
        //     message: "Author data fetch successfully",
        //     allAuthor: allAuthor

        // })
        // const allAuthor = await authorModel.find({ isActive: req.query.isActive })
        // const authorCount = await authorModel.countDocuments()

        const startIndex = parseInt(req.query.startIndex || 0)
        const viewSize = parseInt(req.query.viewSize || 10)
        console.log('startIndex', startIndex, viewSize)

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

        let searchcriteria1 = {}
        if (req.query.keyword1) {
            searchcriteria1['$or'] = [
                { "blogDetails.title": { $regex: `^${req.query.keyword1.trim()}`, $options: 'i' } },
                { "blogDetails.reviewDetails.reviewerName": { $regex: `^${req.query.keyword1.trim()}`, $options: 'i' } },
            ]
        }

        const allAuthor = await authorModel.aggregate([
            {
                $match: searchcriteria
            },
            {
                $match: {
                    addresss: { $exists: false }
                },
            },

            { $sort: { createdAt: 1 } },

            {
                $lookup:
                {
                    from: "blog",
                    localField: "_id",
                    foreignField: "authorId",
                    pipeline: [
                        {
                            $lookup: {
                                from: "review",
                                localField: "_id",
                                foreignField: "blogId",
                                as: "reviewDetails"
                            }
                        },


                        {
                            $unwind: {
                                path: "$reviewDetails",
                                preserveNullAndEmptyArrays: true

                            }
                        },

                        // {
                        //     $project: {
                        //         reviewDetails: 0
                        //     }
                        // }
                    ],
                    as: "blogDetails"
                }
            },

            {
                $unwind: {
                    path: "$blogDetails",
                    preserveNullAndEmptyArrays: true

                }
            },

            // {
            //     $lookup: {
            //         from: "review",
            //         localField: "blogDetails._id",
            //         foreignField: "blogId",
            //         as: "reviewDetails"
            //     }
            // },
            {
                $project: {
                    password: 0,
                }
            },
            { $match: searchcriteria1 },

            {
                $facet: {
                    data: [
                        { $skip: startIndex }, //5
                        { $limit: viewSize }, //10
                    ],
                    count: [
                        { $count: "total" }
                    ]
                }
            },
        ])

        if (!allAuthor[0]?.data.length) {
            return res.status(404).send({ message: "No data found" })
        }


        res.status(200).send({
            message: "Author data fetch successfully",
            count: allAuthor[0]?.count[0]?.total,
            allAuthor: allAuthor[0]?.data

        })

    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const findSingleAuthor = async (req, res) => {
    try {
        const { id } = req.params

        // const authorData = await authorModel.findOne({ _id: new ObjectId(id) })


        const authorData = await authorModel.aggregate([
            {
                $match: {
                    _id: new ObjectId(id)
                },
            },
            {
                $project: {
                    password: 0
                }
            }

        ])


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