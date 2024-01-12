const authorModel = require("../model/authorModel")



const createAuthor = async function (req, res) {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            mobileNumber,
            isActive,
            gender
        } = req.body

        const authorData = await authorModel.create({
            firstName,
            lastName,
            email,
            password,
            mobileNumber,
            isActive,
            gender
        })

        res.status(201).send({ message: "Author created successfully", success: true, authorData })


    } catch (error) {
        return res.status(500).send({ message: error.message })
    }


}

module.exports = { createAuthor }