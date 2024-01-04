const express = require('express');
const router = express.Router();
// const createDemoData = require("../controller/demoController")
// const findAllUsers = require("../controller/demoController")


const { findAllUsers, createDemoData } = require("../controller/demoController")



router.get("/bv/ghj", createDemoData)
router.get("/bv/abc", findAllUsers)


module.exports = router