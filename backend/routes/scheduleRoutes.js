const express = require("express")
const router = express.Router();
const {getSchedule_get,createSchedule_post} = require("../controllers/scheduleController");

router.get("/",getSchedule_get);
router.post("/",createSchedule_post);

module.exports = router;