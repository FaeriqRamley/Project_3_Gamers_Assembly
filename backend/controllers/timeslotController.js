const Timeslot = require("../models/Timeslot");
const Schedule = require("../models/Schedule");

//CRUD
//Create: Create Timeslot
module.exports.createTimeslot_post = async (req, res) => {
  const newTimeslot = new Timeslot({
    ...req.body,
    attendees: [req.body.ownerId],
  });
  await newTimeslot.save();
  await Schedule.updateOne({ownerId: req.body.ownerId}, {
    $push: { timeslots: [newTimeslot._id] },
  });
  res.json(newTimeslot);
};

//Read: Get Timeslot Info
module.exports.viewTimeslot_get = async (req, res) => {
  const viewTimeslot = await Timeslot.find({_id:req.params.id});
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
//-------------------------------------------------

// router.post('/api/timeslot', async (req, res) => {
//   const timeslot = new Timeslot({
//     _id: req.body.id,
//     ownerID: req.body.ownerID,
//     timeStart: req.body.timeStart,
//     timeEnd: req.body.timeEnd,
//     duration: req.body.duration,
//     isActive: true,
//   })

//   await timeslot.save();
//   Schedule.update()
//   res.json({status: 'ok', msg: "saved"})
// })

// //Update
// router.put('/api/schedule/timeslot/:id', async (req,res) => {
//   updateTimeslot = await Schedule.find({_id: req.params.id})
//   if(updateTimeslot[0].timeStart > 0) {
//     await Schedule.findOneAndUpdate(
//       {_id: req.params.id},
//       {$inc: {timeStart: req.body.timeStart}},
//       {$inc: {timeEnd: req.body.timeEnd}},
//       {$inc: {duration: req.body.duration}}
//     )
//   }
// })

// //Delete
