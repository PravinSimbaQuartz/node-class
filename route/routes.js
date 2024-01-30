const express = require('express')
const router = express.Router()

const { middleware1, middleware2, middleware3, middleware4 } = require("../middleware/example")
const { createAuthor, findSingleAuthor, findAllAuther, updateAuthor, deleteAuthor, loginAuthor } = require("../controller/authorController")
const { createBlog, getSingleBlog } = require("../controller/blogController")
const { createReview, findBlogAllReviews } = require("../controller/reviewController")
// Autor route
router.post("/author", createAuthor)
router.get("/author", middleware1, middleware2, findAllAuther, middleware3)
router.get("/author/:id", middleware1, findSingleAuthor)
router.put("/author/:id", middleware1, updateAuthor)
router.delete("/author/:id", middleware1, deleteAuthor)
router.post("/login", middleware1, loginAuthor)


//blog routes
router.post("/blog", createBlog)
router.get("/blog/:id", getSingleBlog)

//review routes
router.post("/review", createReview)
router.get("/review", findBlogAllReviews)


module.exports = router