const router = require('express').Router();
// const router = express.Router()
const { authentication, authorization } = require("../middleware/middleware")
const { createAuthor, findSingleAuthor, findAllAuther, updateAuthor, deleteAuthor, loginAuthor } = require("../controller/authorController")
const { createBlog, getSingleBlog, getAllBlog, deleteBlog } = require("../controller/blogController")
const { createReview, findBlogAllReviews } = require("../controller/reviewController")



// Autor route
router.post("/author", createAuthor)
router.get("/author", findAllAuther)
router.get("/author/:id", findSingleAuthor)
router.put("/author/:id", authentication, authorization, updateAuthor)
router.delete("/author/:id", deleteAuthor)
router.post("/login", loginAuthor)


//blog routes
router.post("/blog", createBlog)
router.get("/blog", getAllBlog)
router.get("/blog/:id", getSingleBlog)
router.delete("/blog/:id", authentication, authorization, deleteBlog)

//review routes
router.post("/review", createReview)
router.get("/review", findBlogAllReviews)

// router.all("*", function (req, res) {
//     res.status(404).send({ message: "Url not found" })
// })


module.exports = router