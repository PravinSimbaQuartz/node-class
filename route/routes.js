const express = require('express')
const router = express.Router()
const { authentication } = require("../middleware/middleware")
const { createAuthor, findSingleAuthor, findAllAuther, updateAuthor, deleteAuthor, loginAuthor } = require("../controller/authorController")
const { createBlog, getSingleBlog, getAllBlog } = require("../controller/blogController")
const { createReview, findBlogAllReviews } = require("../controller/reviewController")



// Autor route
router.post("/author", createAuthor)
router.get("/author", authentication, findAllAuther)
router.get("/author/:id", findSingleAuthor)
router.put("/author/:id", updateAuthor)
router.delete("/author/:id", deleteAuthor)
router.post("/login", loginAuthor)


//blog routes
router.post("/blog", createBlog)
router.get("/blog", getAllBlog)
router.get("/blog/:id", getSingleBlog)

//review routes
router.post("/review", createReview)
router.get("/review", findBlogAllReviews)

// router.all("*", function (req, res) {
//     res.status(404).send({ message: "Url not found" })
// })


module.exports = router