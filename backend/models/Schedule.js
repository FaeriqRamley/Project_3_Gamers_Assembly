const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema(
    {
        ownerId: {
            type: Schema.Types.ObjectId,
            ref: "UserModel",
        },
        sentNotification: [
            {
                senderId: {type:Schema.Types.ObjectId,required:true},
                receiverId: {type:Schema.Types.ObjectId,required:true},
                timeslotId: {type:Schema.Types.ObjectId,required:true},
                gameId: {type:String},
                status: {type:String,required:true},
            }
        ],
        receivedNotification: [
            {
                senderId: {type:Schema.Types.ObjectId,required:true},
                receiverId: {type:Schema.Types.ObjectId,required:true},
                timeslotId: {type:Schema.Types.ObjectId,required:true},
                gameId: {type:String},
                status: {type:String,required:true},
            }
        ],
        timeslots: [
            {
                type: Schema.Types.ObjectId,
                ref: "Timeslot",
            },
        ],
    },
    { timestamps: true }
);

const Schedule = mongoose.model("Schedule", ScheduleSchema);
module.exports = Schedule;
