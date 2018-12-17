const nodemailer = require("nodemailer");
const mailConfig = require("../../config/mail");
const path = require("path");
const exphbs = require("express-handlebars");
const hbs = require("nodemailer-express-handlebars");
const transport = nodemailer.createTransport(mailConfig);
transport.use("compile", hbs({
    viewEngine: exphbs(),
    viewPath: path.resolve(__dirname, "..", "views", "emails"),
    extName: ".hbs"
}));
module.exports = transport;
