const express = require("express")
const router = express.Router();
const {getSchedule_get,createSchedule_post,createTimeslotInvite_post,respondTimeslotInvite_put} = require("../controllers/scheduleController");

router.get("/",getSchedule_get);
router.post("/",createSchedule_post);
router.get("/populate/timeslot",()=>{});

// Notification Routes
router.post("/createInvite",createTimeslotInvite_post);
router.put("/respondInvite/:response",respondTimeslotInvite_put);
module.exports = router;