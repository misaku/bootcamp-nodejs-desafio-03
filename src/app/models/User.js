const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtk = require("jsonwebtoken");
const { secret, ttl } = require("../../config/auth");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});
userSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    this.password = await bcrypt.hash(this.password, 8);
});
userSchema.methods = {
    compareHash (password) {
        return bcrypt.compare(password, this.password);
    }
};
userSchema.statics = {
    generateToken ({ id }) {
        return jwtk.sign({ id }, secret, { expiresIn: ttl });
    }
};
module.exports = mongoose.model("User", userSchema);
