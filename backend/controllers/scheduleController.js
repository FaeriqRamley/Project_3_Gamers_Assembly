const Schedule = require("../models/Schedule");

module.exports.createSchedule_post = async (req,res) => {
    await Schedule.create(
        {
            ownerId: req.body.ownerId,
            timeslots: []
        }
    );
    res.json({status:"ok",message:"added"});
};

module.exports.getSchedule_get = async (req,res) => {
    const userSchedule = await Schedule.findById(req.body._id);
    res.json(userSchedule);
};

module.exports.createTimeslotInvite_post = async (req,res) => {
    await Schedule.findOneAndUpdate({ownerId:req.body.senderId}, {$push:{sentNotifications:{...req.body, status: "Pending"}}});
    await Schedule.findOneAndUpdate({ownerId:req.body.receiverId}, {$push:{receivedNotifications:{...req.body, status: "Pending"}}});
    res.json({status:"ok",message:"Successfully added"});
}

module.exports.respondTimeslotInvite_put = async (req,res) => {

}