require("dotenv").config();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Schedule = require('../models/Schedule')
const FriendList = require('../models/FriendList')

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: "", password: "" };

    // incorrect email
    if (err.message === "incorrect email") {
        errors.email = "that email is not registered";
    }
    // incorrect password
    if (err.message === "incorrect password") {
        errors.password = "that password is incorrect";
    }

    // duplicate email error
    if (err.code === 11000) {
        errors.email = "that email is already registered";
        return errors;
    }

    // validation errors
    if (err.message.includes("User validation failed")) {
        // console.log(err);
        Object.values(err.errors).forEach(({ properties }) => {
            // console.log(val);
            // console.log(properties);
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};

// jwt token creation
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge,
    });
};

// signup get
module.exports.signup_get = (req, res) => {
    res.render("signup");
};

// login get
module.exports.login_get = (req, res) => {
    res.render("login");
};

// signup post
module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = new User({ email, password });

        // create new friendList
        const friendList = await FriendList.create(
            { ownerId: user._id }
        )
        user.friendList = friendList._id
        
        // create new schedule
        const schedule = await Schedule.create(
            { ownerId: user._id }
        )
        user.schedule = schedule._id
        
        await user.save();

        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

        res.status(201).json({ user });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

// login post
module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

// logout get
module.exports.logout_get = (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/");
};
