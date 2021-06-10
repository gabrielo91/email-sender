const sgMail = require("@sendgrid/mail");
const fs = require("fs");

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

console.log(SENDGRID_API_KEY);

sgMail.setApiKey(SENDGRID_API_KEY);

async function SendEmail({ name, email, filename }) {
  const contents = fs.readFileSync(`attachments/${filename}`, {
    encoding: "base64",
  });

  const msg = {
    to: email,
    from: "email sender",
    subject: "Hello attachment",
    html: `<p>Here’s an attachment for you ${name}!</p>`,
    attachments: [
      {
        content: contents,
        filename: `${filename}.pdf`,
        type: "application/pdf",
        disposition: "attachment",
        content_id: "some awesome text",
      },
    ],
  };

  const result = await sgMail.send(msg);
  return result;
}

module.exports = {
  SendEmail,
};
