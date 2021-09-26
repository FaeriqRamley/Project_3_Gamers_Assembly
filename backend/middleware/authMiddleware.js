require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            } else {
                console.log("requireAuth", decodedToken);
                next();
            }
        })
    } else {
        res.redirect('/login');
    }
}

// check current user 
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                return res.status(403).json({ msg: "invalid token"})
            } else {
                console.log('checkUser', decodedToken);
                let user = await User.findById(decodedToken.id);
                req.user = user
                next();
            }
        })
    } else {
        return res.status(401).json({ msg: "no token found" })
    }
}

module.exports = {
    requireAuth,
    checkUser,
}