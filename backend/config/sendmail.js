const nodemailer = require("nodemailer")
exports.sendmail = async (opt) => {
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "fca85fa9b40efb",
            pass: "909b8e9f8cf436"
        }
    });

    const mailOption = {
        from: "fca85fa9b40efb@inbox.mailtrap.io",
        to: opt.email,
        subject: opt.subject,
        text: opt.msg
    }

    await transport.sendMail(mailOption)
}