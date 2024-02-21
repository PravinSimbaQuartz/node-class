const jwt = require("jsonwebtoken")
const authorModel = require("../model/authorModel")
const { ObjectId } = require("mongoose").Types
const blogModel = require("../model/bolgModel")

const authentication = async (req, res, next) => {
    try {
        // const Authorization = req.headers["token"] //x-api-key, token
        //  const token = req.headers["x-api-key"]
        const Authorization = req.headers["authorization"]

        if (!Authorization) {
            return res.status(401).send({ message: "Please login first || Unauthourised" })
        }
        // let verifiedToken;
        jwt.verify(Authorization, "secreteKey", function (err, decoded) {
            if (err) {
                console.log('err', err)
                return res.status(400).send({ message: err.message })
            } else {
                verifiedToken = decoded
            }
        })
        next()
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}

const authorization = async (req, res, next) => {
    try {
        const idFromToken = verifiedToken.authorId
        const { id } = req.params

        const checkAuthor = await authorModel.findOne({ _id: new ObjectId(id) })
        console.log(checkAuthor)

        if (idFromToken !== id) {
            return res.status(403).send({ message: "Forbidden / You have not access of this route " })
        }
        next();
    } catch (error) {
        return res.status(500).send({ message: error.message })

    }
}

const bolgAuthorization = async (req, res, next) => {
    try {
        const idFromToken = verifiedToken.authorId
        const { id } = req.params

        const checkBlog = await blogModel.findOne({ _id: new ObjectId(id) })
        console.log(checkAuthor)

        if (idFromToken !== checkBlog.authorId) {
            return res.status(403).send({ message: "Forbidden / You have not access of this route " })
        }
        next();
    } catch (error) {
        return res.status(500).send({ message: error.message })

    }
}




module.exports = { authentication, authorization, bolgAuthorization }


//RBAC


