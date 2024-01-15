const express = require('express')
const router = express.Router()

const { createAuthor, findSingleAuthor, findAllAuther, updateAuthor, deleteAuthor } = require("../controller/authorController")

// Autor route

router.post("/author", createAuthor)
router.get("/author", findAllAuther)
router.get("/author/:id", findSingleAuthor)
router.put("/author/:id", updateAuthor)
router.delete("/author/:id", deleteAuthor)





module.exports = router