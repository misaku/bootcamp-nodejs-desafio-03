const User = require("./../models/User");
const Ad = require("./../models/Ad");
const Queue = require("./../services/Queue");
const PurchaseMail = require("./../jobs/PurchaseMail");
const Purchase = require("../models/Purchase");

class PurchaseController {
    async store (req, res) {
        const { ad, content } = req.body;
        const purchaseAd = await Ad.findById(ad).populate("author");
        const user = await User.findById(req.userId);
        const pcs = await Purchase.create({ ...req.body, user: req.userId });
        Queue.create(PurchaseMail.Key, {
            ad: purchaseAd,
            user,
            content
        }).save();

        return res.json(pcs);
    }
}

module.exports = new PurchaseController();
