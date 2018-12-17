const Mail = require("./../services/Mail");

class PurchaseMail {
    get Key () {
        return "PurchaseMail";
    }

    async handle (job, done) {
        const { ad, user, content } = job.data;
        await Mail.sendMail({
            from: "\"Mihcel Kuguio\" <michel.kuguio@gmail.com>",
            to: ad.author.email,
            subject: `solicitação de compra: ${ad.title}`,
            template: "purchase",
            context: { user, ad, content }
        });
        return done();
    }
}

module.exports = new PurchaseMail();
