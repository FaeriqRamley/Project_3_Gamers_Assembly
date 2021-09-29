const Timeslot = require("../models/Timeslot");
const Schedule = require("../models/Schedule");

//CRUD
//Create: Create Timeslot
module.exports.createTimeslot_post = async (req, res) => {
  const newTimeslot = new Timeslot({
    ...req.body,
    attendees: [req.body.ownerId]
  });
  await newTimeslot.save();
  await Schedule.updateOne({ownerId: req.body.ownerId}, {
    $push: { timeslots: [newTimeslot._id] },
  });
  res.json(newTimeslot);
};

//Read: Get Timeslot Info
module.exports.viewTimeslot_get = async (req, res) => {
  const viewTimeslot = await Timeslot.find({ownerId:req.params.id});
  res.json(viewTimeslot);
};

module.exports.viewTimeslotById_get = async (req, res) => {
  const viewTimeslot = await Timeslot.findById(req.params.id);
  res.json(viewTimeslot);
};

//Update: To edit isActive/isOpen of timeslot
//body structure
// {
//     _id: ObjID or wtv
//     statusChange: {isActive/isOpen:true/false}
// }
module.exports.editTimeslotBookedStatus_put = async (req, res) => {
  await Timeslot.findByIdAndUpdate(req.body._id, req.body.statusChange);
  res.json({ status: "ok", message: `updated ${req.body.statusChange}` });
};

//Update: To edit timeStart/timeEnd of timeslot
//body structure
// {
//     _id: ObjID or wtv
//     newTimeStart: date obj
//     newTimeEnd: date obj
// }
module.exports.editTimeslotDuration_put = async (req, res) => {
  if (req.body.newTimeStart > req.body.newTimeEnd) {
    res.json({
      status: "failed",
      message: "time end cannot be less than time start",
    });
  } else {
    //$each instead of 2?
    await Timeslot.findByIdAndUpdate(req.body._id, {
      timeStart: req.body.newTimeStart,
    });
    await Timeslot.findByIdAndUpdate(req.body._id, {
      timeEnd: req.body.newTimeEnd,
    });
    res.json({ status: "ok", message: "updated time" });
  }
};

//Update: To add/remove attendees of timeslot
module.exports.editTimeSlotAttendees_put = async (req, res) => {
  if (req.params.action === "push") {
    await Timeslot.findByIdAndUpdate(req.body._id, {
      $push: { attendees: req.body.attendeeId },
    });
    res.json({ status: "ok", message: "pushed attendee" });
  } else {
    await Timeslot.findByIdAndUpdate(req.body._id, {
      $pull: { attendees: req.body.attendeeId },
    });
    res.json({ status: "ok", message: "pulled attendee" });
  }
};

//Delete: Remove Timeslot
module.exports.deleteTimeslot_put = async (req, res) => {
  //Delete timeslot from timeslot db
  await Timeslot.findByIdAndDelete(req.body.timeslotId);
  //Remove timeslot ID from owner's schedule
  await Schedule.findOneAndUpdate(
    { ownerId: req.body.ownerId },
    { $pull: { "timeslots": {$in: [req.body.timeslotId]} } }
  );
  res.json({ status: "ok", msg: "Deleted from timeslot and schedule" });
};

//Delete: Remove Timeslot v2
module.exports.deleteTimeslotVer2_put = async (req, res) => {
  //Delete timeslot from timeslot db
  try{
    const deletingTimeslot = await Timeslot.findById(req.body.timeslotId);
    await Schedule.updateMany(
      { ownerId: deletingTimeslot.attendees },
      { $pull: { "timeslots": {$in: [req.body.timeslotId]} } }
    );
    await Timeslot.findByIdAndDelete(req.body.timeslotId);
    res.json({ status: "ok", msg:"Successfully deleted",deletedFrom: deletingTimeslot.attendees });
  } catch(err){
    console.error(err.message);
    res.json({status:"failed",msg:err.message});
  }

};