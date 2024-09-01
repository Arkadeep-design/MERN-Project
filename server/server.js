require("dotenv").config()

const express = require("express");
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router")
const adminRoute = require("./router/admin-router")
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const cors = require('cors');


const corsOptions = {
    origin: "http://localhost:5173",
    method: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
}

//middleware
app.use(express.json());
app.use(cors(corsOptions));

//middleware
app.use("/api/auth", authRoute);
app.use("/api/form",contactRoute);
app.use("/api/data", serviceRoute);

app.use("/api/admin", adminRoute);

app.use(errorMiddleware);


connectDb().then(()=> {
    app.listen(process.env.PORT, () => {
        console.log(`server running at port: ${process.env.PORT}`);
    })
})