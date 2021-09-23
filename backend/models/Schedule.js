const mongoose = require("mongoose");
const Schema = mongoose.Schema

const ScheduleSchema = new Schema(
  {
    _id: { type: String, required: true },
    ownerId: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    timeslots: [{type: mongoose.Schema.Types.ObjectId, ref: 'Timeslot'}] 
  },
  { timestamps: true },
);

const Schedule = mongoose.model("Schedule", ScheduleSchema);

module.exports = Schedule;