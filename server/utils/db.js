const mongoose = require("mongoose");


const connectDb = async () => {
    mongoose
    .connect(process.env.MONGO_URI, {
        dbName: "backend",
    })
    .then(c=>console.log("database connected"))
    .catch((e)=> console.log(e));
}

module.exports = connectDb;
