const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inviteSchema = new mongoose.Schema(
    {
        inviteType: {type:String,required:true},
        senderId: {type:Schema.Types.ObjectId,required:true},
        receiverId: {type:Schema.Types.ObjectId,required:true},
        timeslotId: {type:Schema.Types.ObjectId},
        gameId: {type:String},
        status: {type:String,required:true,default:"Pending"},
    },
    { timestamps: true }
);

const Invite = mongoose.model("Invite", inviteSchema);

module.exports = Invite;