// mongodb + srv://pravinpatekar:wb0enET0wmCesDqn@cluster0.ftnu4ge.mongodb.net/

const express = require('express');
const mongoose = require('mongoose');
const route = require("./route/routes")
const authorModel = require("./model/authorModel")
const { database, port } = require("./config/keys")
console.log('DATABASE_NAME, PORT', database, port)
const app = express();

app.use(express.json())

mongoose.connect(database, {
    useNewUrlParser: true,
}).then(async () => {
    console.log("MongoDB is connected");
    // console.log(await authorModel.findOne({ email: "navnoor@gmail.com" }))
}
).catch((err) => console.log(err))

app.use("/api", route)
app.listen(port || 2000, () => console.log(`MongoDB is listening on port ${port}`))

// console.log(Date.now())

app.all("*", function (req, res) {
    res.status(404).send({ message: "Url not found" })
})


// single get Author as global middleware =>
// await
// async
// after conecting to DB




//SQL and NoSQL

// //SQL => 
// 1. Relational Database
// 2 predefine Schema
// 3. Oracle
// 4 verically scallable



// //NoSQL
// 1.Non Relational Database
// 2  not predefine // dynamic Schema
// 3 MongoDB, couchDB
// 4 horizontally scallable