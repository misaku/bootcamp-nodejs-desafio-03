const mongoose = require("mongoose");
const mongoosePagenate = require("mongoose-paginate");
const Purchase = new mongoose.Schema({
    ad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ad",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});
Purchase.plugin(mongoosePagenate);
module.exports = mongoose.model("Purchase", Purchase);
