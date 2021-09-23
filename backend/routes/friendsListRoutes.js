const express = require("express")
const router = express.Router();

router.get("/sent",()=>{});
router.delete("/sent",()=>{});
router.post("/sent",()=>{});
router.get("/received",()=>{});
router.delete("/received",()=>{});
router.post("/received",()=>{});
router.get("/friendList",()=>{});
router.post("/friendList",()=>{});

module.exports = router;