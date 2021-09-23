const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const friendListSchema = new Schema(
    {
        ownerId: { 
            type: Schema.Types.ObjectId, 
            ref: "User" 
        },
        sentRequest: [
            { 
                type: Schema.Types.ObjectId, 
                ref: "User" 
            }
        ],
        receivedRequest: [
            { 
                type: Schema.Types.ObjectId, 
                ref: "User" 
            }
        ],
        friendList: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
                username: String,
                email: String,
            },
        ],
    },
    { timestamps: true }
);

const FriendList = mongoose.model("FriendList", friendListSchema);
module.exports = FriendList;
