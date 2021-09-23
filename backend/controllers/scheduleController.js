const Schedule = require("../models/Schedule");

module.exports.createSchedule_post = async (req,res) => {
    await Schedule.create(
        {
            ownerId: req.body.ownerId,
            timeslots: []
        }
    );
    res.json({status:"ok",message:"added"});
};

module.exports.getSchedule_get = async (req,res) => {
    const userSchedule = await Schedule.findById(req.body._id);
    res.json(userSchedule);
}