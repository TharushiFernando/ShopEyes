const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require('multer');
const cors = require('cors'); // React Package for Frontend to deal with Backend.
const dotenv = require("dotenv");
require("dotenv").config();
const app = express();


const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

//connect to database
async function connect() {
    try {
        await mongoose.connect(URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(error);
    }

}

connect();


app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT}`)
})


//Routes
const itemRouter = require("./routes/items.js");
app.use("/item", itemRouter);

const userRouter = require("./routes/auth.js");
app.use("/user", userRouter);

const navigationRouter = require("./routes/navigations.js");
app.use("/navigation", navigationRouter);