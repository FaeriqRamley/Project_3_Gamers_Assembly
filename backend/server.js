require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const authRoutes = require("./routes/authRoutes");
const friendListRoutes = require("./routes/friendListRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");
const timeslotRoutes = require("./routes/timeslotRoutes");
const inviteRoutes = require("./routes/inviteRoutes");
const userRoutes = require("./routes/userRoutes");
const Games = require("./models/seed/games");

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())

// database connection
const PORT = process.env.PORT;
const dbURI = process.env.MONGO_URI;
console.log(dbURI);
mongoose
  .connect(dbURI, { useNewUrlParser: true })
  .then(() => {
    console.log("Mongodb connection established.");
    app.listen(PORT, () => console.log(`listening to port: ${PORT}`));
  })
  .catch((err) => console.log(err));

app.get("/test", (req, res) => {
  res.json(Games);
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/timeslot", timeslotRoutes);
app.use("/api/schedule", scheduleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/invites", inviteRoutes);