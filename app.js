const express = require("express")
require("dotenv").config()
const app = express()
const mongoose = require("mongoose")
const authRoutes = require("./routes/authRoutes")
const noteRoutes = require("./routes/noteRoutes")

const {requireAuth , checkUser} = require("./middleware/authMiddleware")
const cookieParser = require("cookie-parser")

// middleware

app.use(express.static("public"))
app.use(express.json())
app.use(cookieParser())

// view engine

app.set("view engine" , "ejs")

// database connection

try{
    mongoose.connect(process.env.dbURL ,)
    app.listen(process.env.PORT)

}catch(err)
{
    console.log(err)
}

// routes
app.get("*" , checkUser)
app.post("*" , checkUser)
app.get("/" ,(req , res)=>res.render("home"))
app.use(authRoutes)
app.use(noteRoutes)






