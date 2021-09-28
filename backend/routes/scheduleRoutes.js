const express = require("express");
const {checkUser} = require("../middleware/authMiddleware");
const router = express.Router();
const {
    getSchedule_get,
    createSchedule_post,
    createTimeslotInvite_post,
    respondTimeslotInvite_put,
    removeRespondedTimeslotInvite_delete,
    schedule_get
} = require("../controllers/scheduleController");

router.get("/",getSchedule_get);
router.post("/",createSchedule_post);
router.get("/populate/timeslot", checkUser, schedule_get);

// Notification Routes
router.post("/createInvite",createTimeslotInvite_post);
router.put("/respondInvite/:response",respondTimeslotInvite_put);
router.delete("/clearInvite",removeRespondedTimeslotInvite_delete)
module.exports = router;