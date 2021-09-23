const Timeslot = require("../models/timeslotSchema");
const Schedule = require("../models/scheduleSchema");

//CRUD
//Create
module.exports.create_post = async (req,res) => {
    const newTimeslot = new Timeslot(req.body);
    await newTimeslot.save();
    // Schedule.findByIdAndUpdate({_id: req.params.id},{$push:{timeslots:[newTimeslot._id]}})
    res.json(newTimeslot);
}

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