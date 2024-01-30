
const middleware1 = async (req, res, next) => {
    try {

        console.log(1111111111111)
        next()

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}
const middleware2 = async (req, res, next) => {
    try {

        console.log(222222222222)
        next()

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}
const middleware3 = async (req, res, next) => {
    try {

        console.log(3333333333)
        res.send({ message: "successfull" })
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}
const middleware4 = async (req, res, next) => {
    try {

        console.log(444444444)
        // next()

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}


module.exports = { middleware1, middleware2, middleware3, middleware4 }



//Types of middleware
// -router level middleware => specific route
// - application or global middleware => any API   ex. index file
// - error handling middleware
// - third party middleware
// -build in middleware


// Open to all API's  => API,s without middleware
// restricted API's => API,s with middleware