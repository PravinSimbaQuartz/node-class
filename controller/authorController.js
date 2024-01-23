const authorModel = require("../model/authorModel")
const { ObjectId } = require("mongoose").Types
const bcrypt = require("bcrypt")

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

const findAllAuther = async (req, res) => {
    try {

        const { isActive } = req.query
        console.log(11111111, typeof isActive)

        const allAuthor = await authorModel.find({ isActive: isActive })

        // const authorCount = await authorModel.countDocuments()

        res.status(200).send({ message: "Author data fetch successfully", allAuthor })

    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const findSingleAuthor = async (req, res) => {
    try {
        const { id } = req.params

        const authorData = await authorModel.findOne({ _id: new ObjectId(id) })

        if (!authorData) {
            return res.status(404).send({ message: "Author not found" })

        }

        res.status(200).send({ message: "Author data fetch successfully", authorData })

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


module.exports = { createAuthor, findAllAuther, findSingleAuthor, updateAuthor, deleteAuthor }



// /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)

// (!/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(password))

// create, find, findOne, findOneAndUpdate, findOneAndDelete,
// countDocuments,findById, findByIdAndUpdate, findByIdAndDelete

// find => array
// remainingQueries => Object

