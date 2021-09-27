const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timeslotSchema = new mongoose.Schema(
  {
    ownerId: { type: String, required: true },
    gameId: { type: String },
    maxPlayers: { type: Number },
    timeStart: { Date, required: true },
    timeEnd: { Date, required: true },
    duration: { type: Number, min: 0 },
    isActive: { type: Boolean, default: false },
    isOpen: { type: Boolean, default: true },
    attendees: { type: Array },
  },
  { timestamps: true }
);

const Timeslot = mongoose.model("Timeslot", timeslotSchema);

module.exports = Timeslot;
