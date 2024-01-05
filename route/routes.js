const express = require('express');
const router = express.Router();
// const createDemoData = require("../controller/demoController")
// const findAllUsers = require("../controller/demoController")


const { findAllUsers, createDemoData, getSingleUser } = require("../controller/demoController")



router.get("/bv/ghj", createDemoData)
router.get("/bv/abc", findAllUsers)
// router.get("/fetch", getSingleUser)
router.get("/fetch/:id", getSingleUser)


module.exports = router