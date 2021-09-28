const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timeslotSchema = new mongoose.Schema(
  {
    ownerId: { type: String, required: true },
    eventTitle: { type: String },
    maxPlayers: { type: Number },
    timeStart: Date,
    timeEnd: Date,
    duration: { type: Number, min: 0 },
    isActive: { type: Boolean, default: false },
    isOpen: { type: Boolean, default: true },
    attendees: { type: Array },
  },
  { timestamps: true }
);

const Timeslot = mongoose.model("Timeslot", timeslotSchema);

module.exports = Timeslot;
