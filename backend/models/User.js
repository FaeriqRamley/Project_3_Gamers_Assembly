const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Please enter an email"],
            unique: true,
            lowercase: true,
            validate: [isEmail, "Please enter a valid email"],
        },
        password: {
            type: String,
            required: [true, "Please enter a password"],
            minlength: [6, "Minimum password length is 6 characters"],
        },
        firstName: String,
        lastName: String,
        userName: String,
        location: String,
        bio: { type: String, maxlength: 150 },
        rating: [{ type: String, max: 5, min: 0 }],
        friendList: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FriendList",
        },
        schedule: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Schedule",
        },
        matchHistory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MatchHistory",
        },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error("incorrect password");
    }
    throw Error("incorrect email");
};

const User = mongoose.model("User", userSchema);
module.exports = User;
