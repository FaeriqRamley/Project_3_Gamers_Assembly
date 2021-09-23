const express = require("express")
const router = express.Router();
const {create_post} = require("../controllers/timeslotController")

router.get("/",()=>{});
router.post("/:id",create_post);
router.put("/",()=>{});
router.delete("/",()=>{});


module.exports = router;