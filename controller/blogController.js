const blogModel = require("../model/bolgModel.js")
const authorModel = require("../model/authorModel")
const { ObjectId } = require("mongoose").Types

const createBlog = async (req, res) => {
    try {
        const { title,
            description,
            category,
            subCategory,
            authorId } = req.body

        const blogData = await blogModel.create({
            title,
            description,
            category,
            subCategory,
            authorId
        })

        res.status(201).send({
            message: "Blog created successfully", success: true, blogData
        })
    } catch (error) {
        return res.status(500).send({ message: error.message, success: false })

    }
}

const getSingleBlog = async (req, res) => {
    try {

        const { id } = req.params
        const blogData = await blogModel.findOne({ _id: new ObjectId(id) })
        const authorData = await authorModel.findOne({ _id: new ObjectId(blogData.authorId) })

        allData = {
            blogData: blogData, authorData: authorData
        }

        res.status(200).send({ message: "Blog fetch successfully", allData })


    } catch (error) {
        return res.status(500).send({ message: error.message, success: false })

    }
}
const getAllBlog = async (req, res) => {
    try {

        // const blogData = await blogModel.find()

        const blogData = await blogModel.aggregate([
            {
                $sort: {
                    createdAt: -1
                }
            },


            {
                $lookup: {
                    from: "author",
                    localField: "authorId",
                    foreignField: "_id",
                    as: "authorDetails"
                }
            },

            {
                $unwind: {
                    path: "$authorDetails",
                    preserveNullAndEmptyArrays: true,

                }
            },
            {
                $lookup: {
                    from: "review",
                    localField: "_id",
                    foreignField: "blogId",
                    as: "reviewDetails"

                }
            }
        ])




        res.status(200).send({ message: "Blog fetch successfully", blogData })


    } catch (error) {
        return res.status(500).send({ message: error.message, success: false })

    }
}

const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params
        const blogData = await blogModel.findOneAndDelete({ _id: new ObjectId(id) })
        res.status(200).send({ message: "Blog deleted successfully" })
    } catch (error) {
        return res.status(500).send({ message: error.message, success: false })

    }
}


module.exports = { createBlog, getSingleBlog, getAllBlog, deleteBlog }