import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username field is required"]
    },
    password: {
        type: String,
        required: [true, "Password field is required"]
    }
});

const User = mongoose.model("users", userSchema);

export {User};