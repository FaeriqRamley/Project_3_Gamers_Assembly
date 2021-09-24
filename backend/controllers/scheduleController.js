const Schedule = require("../models/Schedule");
const Invite = require("../models/Invite");
const Timeslot = require("../models/Timeslot");
const mongoose = require("mongoose");

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
    //Create Invite and save to invite db
    const newInvite = new Invite(req.body);
    await newInvite.save();
    //Add reference to sender's sent notifications and receivers's received notifications
    await Schedule.findOneAndUpdate({ownerId:req.body.senderId}, {$push:{sentNotifications: newInvite._id}});
    await Schedule.findOneAndUpdate({ownerId:req.body.receiverId}, {$push:{receivedNotifications:newInvite._id}});
    res.json({status:"ok",message:"Successfully added"});
}

module.exports.respondTimeslotInvite_put = async (req,res) => {

    //These 3 lines is so that you don't have to input the senderId,receiverId,timeslotId from the front-end, only need input invite's id. Can remove also if yall want
    const inviteObj = await Invite.findById(req.body.inviteId)
    if (!inviteObj){res.json({status:"failed",message:"invite does not exist"})};
    const {senderId,receiverId,timeslotId} = inviteObj;
    const {inviteId} = req.body;

    if (req.params.response === "Decline"){
        //Change invite's status to "Declined"
        await Invite.findByIdAndUpdate(inviteId,{$set:{status:"Declined"}});
        //Remove invite from receiver's received notifications array (cause he's already seen it)
        await Schedule.findOneAndUpdate({ownerId:receiverId},{$pull:{receivedNotifications:inviteId}})
        res.json({status:"ok",message:"successfully declined"});

    } else if (req.params.response === "Accept"){
        //Change Invite's status to "Declined"
        await Invite.findByIdAndUpdate(inviteId,{$set:{status:"Accepted"}});
        //Add timeslot reference to sender's timeslots
        await Schedule.findOneAndUpdate( {ownerId:senderId},{$push:{timeslots:mongoose.Types.ObjectId(timeslotId)}})
        //Add sender's ID to the timeslot's attendees
        await Timeslot.findByIdAndUpdate(timeslotId,{$push:{attendees:senderId.toString()}})
        //Remove invite from receiver's received notifications array (cause he's already seen it)
        await Schedule.findOneAndUpdate({ownerId:receiverId},{$pull:{receivedNotifications:inviteId}})
        res.json({status:"ok",message:"successfully accepted"});
    } else {
        res.json({status:"failed",message:"Response not recognized"})
    }
}

//For sender who has already read the returned notification to remove it from their history (and invite db, idk if we wanna do this or not though)
module.exports.removeRespondedTimeslotInvite_delete = async (req,res) => {
    await Schedule.findOneAndUpdate({ownerId:req.body.senderId},{$pull:{sentNotifications:req.body.inviteId}});
    await Invite.findByIdAndDelete(req.body.inviteId);
    res.json({status:"ok",messaged:"Removed invite from db and reference from sender's schedule"})
} 