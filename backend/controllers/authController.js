require("dotenv").config();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Schedule = require('../models/Schedule');
const FriendList = require('../models/FriendList');
const bcrypt = require('bcrypt');

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors;

    // incorrect email
    if (err.message === "incorrect email") {
        errors = "email is not registered";
    }
    // incorrect password
    if (err.message === "incorrect password") {
        errors = "password is incorrect";
    }

    // duplicate email error
    if (err.code === 11000) {
        errors = "email is already registered";
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
    const { userName, email, password } = req.body;

    try {
        const user = new User({ 
            userName, 
            email, 
            password
        });

        // create new friendList
        const friendList = new FriendList(
            { ownerId: user._id }
        )
        user.friendList = friendList._id
        
        // create new schedule
        const schedule = new Schedule(
            { ownerId: user._id }
        )
        user.schedule = schedule._id
        
        await user.save();
        await friendList.save();
        await schedule.save();

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

// load user
module.exports.user_get = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        res.status(200).json({ user })
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "status 500" })
    }
}

// change password 
module.exports.changePassword_put = async (req, res) => {
    let { newPassword } = req.body;
    console.log(newPassword)
    console.log(req.user._id)
    try {
        const salt = await bcrypt.genSalt();
        newPassword = await bcrypt.hash(newPassword, salt);

        const user = await User.findByIdAndUpdate(
            req.user._id, 
            { $set: { password: newPassword }
        })

        console.log(user)
        res.status(200).json({ user })
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "status 500" })
    }
}

// update profile
module.exports.updateProfile_put = async (req, res) => {
    console.log('controller', req.body);
    const updatedCredentials = req.body

    try {
        const user = await User.findByIdAndUpdate(
            req.user._id, 
            { $set: updatedCredentials }
        )
        
        await user.save();

        console.log(user)
        res.status(200).json({ user })
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "status 500" })
    }
}