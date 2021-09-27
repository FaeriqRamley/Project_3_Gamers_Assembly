const express = require("express");
const router = express.Router();
const {
  createTimeslot_post,
  viewTimeslot_get,
  viewTimeslotById_get,
  editTimeslotBookedStatus_put,
  editTimeslotDuration_put,
  editTimeSlotAttendees_put,
  deleteTimeslot_put,
} = require("../controllers/timeslotController");

router.get("/byOwnerId/:id", viewTimeslot_get);
router.get("/byTimeslotId/:id", viewTimeslotById_get);
router.post("/", createTimeslot_post);
router.put("/edit/booked_status", editTimeslotBookedStatus_put);
router.put("/edit/duration", editTimeslotDuration_put);
router.put("/edit/attendees/:action", editTimeSlotAttendees_put);
router.delete("/", deleteTimeslot_put);

module.exports = router;
