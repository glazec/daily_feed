// 授权邮件
//
// 发送一封邮件给项目使用者，使用者可以在这封邮件中加入一些表单。这样自动发送给女朋友的邮件中可以有些你写的内容。此文件为Google Cloud云函数。

/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.grantMail = (event, context) => {
    const ejs = require("ejs")
    const fs = require("fs"); //文件读写

    // const pubsubMessage = event.data;
    // console.log(Buffer.from(pubsubMessage, 'base64').toString());
    const template = ejs.compile(
        fs.readFileSync("./email.ejs", "utf8")
      );
      HtmlData = {};
      HtmlData['httpPageUrl'] = process.env.httpPageUrl
      const html = template(HtmlData);
    
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: process.env.confirmTo,
        from: 'glaze@inevitable.tech',
        subject: 'Daily Feed Confirmation',
        html: html,
    };
    sgMail.send(msg).then(() => { console.log('send to ' + process.env.confirmTo) })

};

