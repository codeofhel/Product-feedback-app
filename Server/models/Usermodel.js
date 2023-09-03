const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: String,
    age: Number,
    admin: Boolean,
    username: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    }
})

module.exports = mongoose.model("Users", UserSchema);