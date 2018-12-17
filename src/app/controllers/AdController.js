const ad = require("../models/Ad");
const Purchase = require("../models/Purchase");

class AdController {
    async index (req, res) {
        const filters = {};
        if (req.query.price_min || req.query.price_max) {
            filters.price = {};
            if (req.query.price_min)
                filters.price.$gte = req.query.price_min;
            if (req.query.price_max)
                filters.price.$lte = req.query.price_max;
        }
        if (req.query.title)
            filters.title = new RegExp(req.query.title, "i");

        filters.purchaseBy = {};
        filters.purchaseBy.$eq = null;
        const ads = await ad.paginate(filters, {
            page: req.query.page || 1,
            limit: 20,
            populate: ["author"],
            sort: "-createdAt"
        });
        return res.json(ads);
    }

    async show (req, res) {
        const ads = await ad.findOne({ _id: req.params.id }).populate(["purchaseBy", "author"]);
        return res.json(ads);
    }

    async store (req, res) {
        const ads = await ad.create({ ...req.body, author: req.userId });
        return res.json(ads);
    }

    async buy (req, res) {
        // OLD
        // const pcs = await Purchase.findOne({ _id: req.params.id });
        // const ads = await ad.findOneAndUpdate({ _id: pcs.ad }, { purchaseBy: req.params.id }, { new: true });

        // NOVO
        const { ad } = await Purchase.findById(req.params.id).populate({
            path: "ad",
            populate: {
                path: "author"
            }
        });

        if (!ad.author._id.equals(req.userId)) {
            return res.status(401).json({ error: "You're not the ad author" });
        }

        if (ad.purchasedBy) {
            return res
                .status(400)
                .json({ error: "This ad had already been purchased" });
        }

        ad.purchasedBy = req.params.id;

        await ad.save();

        return res.json(ad);
    }

    async update (req, res) {
        const ads = await ad.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        return res.json(ads);
    }

    async destroy (req, res) {
        await ad.findOneAndUpdate({ _id: req.params.id });
        return res.send();
    }
}

module.exports = new AdController();
