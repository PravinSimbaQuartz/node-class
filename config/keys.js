require("dotenv").config();;

module.exports = {
    database: process.env.DATABASE_NAME,
    port: process.env.PORT
};
