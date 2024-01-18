const express = require('express')
const router = express.Router()

const { createAuthor, findSingleAuthor, findAllAuther, updateAuthor, deleteAuthor } = require("../controller/authorController")
const { createBlog, getSingleBlog } = require("../controller/blogController")
const { createReview, findBlogAllReviews } = require("../controller/reviewController")
// Autor route
router.post("/author", createAuthor)
router.get("/author", findAllAuther)
router.get("/author/:id", findSingleAuthor)
router.put("/author/:id", updateAuthor)
router.delete("/author/:id", deleteAuthor)

//blog routes
router.post("/blog", createBlog)
router.get("/blog/:id", getSingleBlog)

//review routes
router.post("/review", createReview)
router.get("/review", findBlogAllReviews)


module.exports = router