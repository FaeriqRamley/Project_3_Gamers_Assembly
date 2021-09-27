const express = require("express")
const router = express.Router();
const {getReceivedInvitesByID_get,getSentRespondedInvitesByID_get} = require("../controllers/inviteController")

router.get("/received/:id",getReceivedInvitesByID_get);
router.get("/responded/:id",getSentRespondedInvitesByID_get);

module.exports = router;