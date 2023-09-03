const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session")
const cors = require("cors");
const server = express();
const userRouter = require("./routes/userRoutes");
const suggestionRouter = require("./routes/suggestionRoutes");


server.use(cors({
    origin: "http://localhost:3000",
    credentials:true
}))

server.use(session({
    secret: "mySecret",
    resave: false,
    saveUninitialized:false
}))

require("dotenv").config();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(_ => console.log("Data base connected!!"))
    .catch(err => console.log(err))

server.use(suggestionRouter);
server.listen(process.env.PORT);