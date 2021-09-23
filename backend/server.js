const express = require("express");
const cookieParser = require("cookie-parser");
require('dotenv').config();
const mongoose = require("mongoose");
const {checkUser} = require("./middleware/authMiddleware");
const authRoutes = require("./routers/authRoutes");
const games = require("./models/games");

const friendsListRoutes = require("./routers/friendsListRoutes");
const scheduleRoutes = require("./routers/scheduleRoutes");
const timeslotRoutes = require("./routers/timeslotRoutes");
const userRoutes = require("./routers/userRoutes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());


// database connection
const PORT = process.env.PORT;
const dbURI = process.env.MONGO_URI;
console.log(dbURI);
mongoose
    .connect(dbURI, { useNewUrlParser: true })
    .then(() => {
        console.log('Mongodb connection established.')
        app.listen(PORT, () => console.log(`listening to port: ${PORT}`));
    })
    .catch((err) => console.log(err));
    

app.get("/test",(req,res)=> {
    res.json(games)
})

app.get('*', checkUser);
app.use(authRoutes);
app.use("/api/timeslot",timeslotRoutes);