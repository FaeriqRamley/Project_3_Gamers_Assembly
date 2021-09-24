const Schedule = require("../models/Schedule");
const Invite = require("../models/Invite");
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

    // const senderSchedule = await Schedule.find({ownerId:req.body.senderId});
    // const receiverSchedule = await Schedule.find({ownerId:req.body.receiverId});
    // const senderIndex = senderSchedule.sentNotifications.findIndex((invite) => invite._id === req.body.inviteId);
    // const receiverIndex = senderSchedule.sentNotifications.findIndex((invite) => invite._id === req.body.inviteId);

    if (req.params.response === "Decline"){
        await Schedule.updateOne(
            { "ownerId":req.body.senderId, "sentNotifications._id": req.body.inviteId },
            { $set: {"sentNotifications.$.status":"Declined"}}
        )
        res.json({status:"ok",message:"successfully declined"})
    } else if (req.params.response === "Accept"){
        res.json({status:"ok",message:"successfully accepted"})
    } else {
        res.json({status:"failed",message:"Response not recognized"})
    }
}