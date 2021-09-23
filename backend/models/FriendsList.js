const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

const friendListSchema = new Schema(
    {
    sentRequest: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    receivedRequest: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    friendList:
            [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                username: String,
                email: String
            }]
    }, { timestamps: true })
    

const FriendList = mongoose.model("friendList", friendListSchema);
module.exports = FriendList;