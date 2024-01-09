const express = require('express');
const router = express.Router();
// const createDemoData = require("../controller/demoController")
// const findAllUsers = require("../controller/demoController")


const { findAllUsers, createDemoData, getSingleUser, updateUser, deleteUser } = require("../controller/demoController")


// HTTP methods
// 1. post  => create
// 2. get  => fetch
// 3. put  => update
// 4. delete => delete
// 5. patch => update



router.post("/customer", createDemoData)
router.get("/customer", findAllUsers)
router.get("/customer/:id", getSingleUser)
router.put("/customer/:id", updateUser)
router.delete("/customer/:id", deleteUser)


// router.post("/user", createDemoData)
// router.get("/user", findAllUsers)
// router.get("/user/:id", getSingleUser)
// router.put("/user/:id", updateUser)
// router.delete("/user/:id", deleteUser)


module.exports = router