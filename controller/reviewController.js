const reviewmodel = require("../model/reviewModel")

const createReview = async (req, res) => {
    try {
        const { rating,
            blogId,
            feedback } = req.body

        // if (rating > 5) {
        //     return res.status(400).send({ message: "Rating should be between 1 and 5" })
        // }

        if (!/^[1-5]$/.test(rating)) {

            return res.status(400).send({ message: "Rating should be between 1 and 5" })
        }
        const reviewData = await reviewmodel.create({
            rating,
            blogId,
            feedback
        })


        res.status(201).send({ message: 'Review created successfully', reviewData })



    } catch (error) {
        res.status(500).send({ message: error.message, success: false })

    }
}

module.exports = { createReview }

