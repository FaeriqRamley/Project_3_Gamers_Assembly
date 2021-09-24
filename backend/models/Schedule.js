const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema(
    {
        ownerId: {
            type: Schema.Types.ObjectId,
            ref: "UserModel",
        },
        sentNotifications: [
            {
                type: Schema.Types.ObjectId,
                ref: "Invite"
            }
        ],
        receivedNotifications: [
            {
                type: Schema.Types.ObjectId,
                ref: "Invite"
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
