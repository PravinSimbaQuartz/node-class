const jwt = require("jsonwebtoken")

const authentication = async (req, res, next) => {
    try {
        // const Authorization = req.headers["token"] //x-api-key, token
        //  const token = req.headers["x-api-key"]
        const Authorization = req.headers["authorization"]

        if (!Authorization) {
            return res.status(401).send({ message: "Please login first || Unauthourised" })
        }

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




module.exports = { authentication }