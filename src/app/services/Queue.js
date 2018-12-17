const keu = require("kue");
const redisConfig = require("../../config/redis");
const jobs = require("../jobs");
const Sentry = require("@sentry/node");

const Queue = keu.createQueue({ prefix: "msk", redis: redisConfig });
Queue.process(jobs.PurchaseMail.Key, jobs.PurchaseMail.handle);
Queue.on("error", Sentry.captureException);

module.exports = Queue;
