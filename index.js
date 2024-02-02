// mongodb + srv://pravinpatekar:wb0enET0wmCesDqn@cluster0.ftnu4ge.mongodb.net/

const express = require('express');
const mongoose = require('mongoose');
const route = require("./route/routes")
const port = 6000

const app = express();

app.use(express.json())

mongoose.connect("mongodb+srv://pravinpatekar:wb0enET0wmCesDqn@cluster0.ftnu4ge.mongodb.net/", {
    useNewUrlParser: true,
}).then(() => console.log("MongoDB is connected")).catch((err) => console.log(err))


app.use("/api", route)

app.listen(port, () => console.log(`MongoDB is listening on port ${port}`))

app.all("*", function (req, res) {
    res.status(404).send({ message: "Url not found" })
})

