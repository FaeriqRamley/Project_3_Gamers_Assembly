const Invite = require("../models/Invite");

module.exports.getReceivedInvitesByID_get = async (req,res) => {
    const userInvites = await Invite.find({receiverId:req.params.id,status:{$eq:"Pending"}});
    res.json(userInvites);
}

module.exports.getSentRespondedInvitesByID_get = async (req,res) => {
    const userInvites = await Invite.find({senderId:req.params.id,status:{$ne:"Pending"}});
    res.json(userInvites);
}