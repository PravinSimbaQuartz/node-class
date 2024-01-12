const express = require('express')
const router = express.Router()

const { createAuthor } = require("../controller/authorController")

// Autor route

router.post("/author", createAuthor)





module.exports = router