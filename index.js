const express = require("express")
const mongoose = require("mongoose")
const route = require("./route/routes.js")
// wb0enET0wmCesDqn
// mongodb+srv://pravinpatekar:<password>@cluster0.ftnu4ge.mongodb.net/

const app = express()
app.use(express.json())

mongoose.connect("mongodb+srv://pravinpatekar:wb0enET0wmCesDqn@cluster0.ftnu4ge.mongodb.net/", {
    useNewUrlParser: true,
}).then(() => console.log("MongoDb is connected")).catch((err) => console.log("Promise failed", err))


app.use("/api", route)

app.listen(7000, () => {
    console.log('Server listening on port 7000')
})

