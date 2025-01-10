const dotenv = require("dotenv")
dotenv.config();
const cors = require("cors")
const express = require("express")
const app = express();
const userRoute = require('./routes/user.routes.js')
//Calling the db call and then executing it.
const connectToDb =require("./db/db.js")
connectToDb();
const cookieParser = require('cookie-parser');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get("/", (req, res) => {
    res.send("Working")
})
app.use("/users", userRoute)



module.exports = app