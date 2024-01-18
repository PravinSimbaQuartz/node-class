const reviewmodel = require("../model/reviewModel")
const { ObjectId } = require("mongoose").Types

const createReview = async (req, res) => {
    try {
        const { rating,
            blogId,
            feedback,
            reviewerName } = req.body

        // if (rating > 5) {
        //     return res.status(400).send({ message: "Rating should be between 1 and 5" })
        // }
        if (!/^[1-5]$/.test(rating)) {
            return res.status(400).send({ message: "Rating should be between 1 and 5" })
        }
        const reviewData = await reviewmodel.create({
            rating,
            blogId,
            feedback,
            reviewerName
        })
        res.status(201).send({ message: 'Review created successfully', reviewData })
    } catch (error) {
        res.status(500).send({ message: error.message, success: false })
    }
}

const findBlogAllReviews = async (req, res) => {
    try {

        const { blogId } = req.query


        const blogData = await reviewmodel.find({ blogId: ObjectId(blogId) })
        res.status(200).send({ message: 'Review fetch successfully', blogData })


    } catch (error) {
        res.status(500).send({ message: error.message, success: false })

    }


}








module.exports = { createReview, findBlogAllReviews }

