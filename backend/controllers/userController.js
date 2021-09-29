const User = require("../models/User");

module.exports.getUserByUserId_get = async (req,res) => {
    try {
        const thisUser = await User.findById(req.params.id).populate({
            path:"schedule", populate:[
                { path: "timeslots", model:"Timeslot", populate:[
                    { path: "attendees", model:"User", select:["userName"]}
                ]},
                { path: "sentNotifications", model:"Invite", populate:[
                    { path: "receiverId" , model: "User" },
                    { path: "senderId" , model: "User" },
                    { path: "timeslotId" , model: "Timeslot" }
                ]},
                { path: "receivedNotifications", model: "Invite", populate: [
                    { path: "receiverId" , model: "User" },
                    { path: "senderId" , model: "User" },
                    { path: "timeslotId" , model: "Timeslot" }
                ]},
            ],
        }).select("-password, -__v")
    
        res.status(201).json(thisUser);
    } catch (err) {
        console.log(err)
        res.status(404).json({ msg: "404: User does not exist." })
    }
};

module.exports.getAllUsers_get = async (req,res) => {
    const limit = req.params.limit || 50;
    const allUsers = await User.find({}).limit(limit);
    res.json(allUsers);
};