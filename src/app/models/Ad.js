const mongoose = require("mongoose");
const mongoosePagenate = require("mongoose-paginate");
const adSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    purchaseBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Purchase",
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});
adSchema.plugin(mongoosePagenate);
module.exports = mongoose.model("Ad", adSchema);
