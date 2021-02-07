let { setLicenseKey } = require("../../utils/db.js");
const mailgun = require("mailgun-js");
const { v4: uuidv4 } = require("uuid");
const { genHash, genSalt } = require("../../utils/hash.js");

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
});

exports.handler = async function (req, context) {
  const event = JSON.parse(req.body);
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    const licenseKey = uuidv4();
    const salt = await genSalt();
    const hash = await genHash(salt, licenseKey);
    const email = paymentIntent.receipt_email;

    try {
      await sendEmail(email, licenseKey);
    } catch (e) {
      console.error(e);
      return {
        statusCode: 500,
        body: `Error sending email: ${JSON.stringify(e)}`
      };
    }
    try {
      await setLicenseKey(email, hash);
    } catch (e) {
      console.error(e);
      return {
        statusCode: 500,
        body: `Error persisting license key to the database ${JSON.stringify(
          e
        )}`
      };
    }
  } else {
    return {
      statusCode: 404,
      body: `Unhandled event type ${event.type}`
    };
  }

  return {
    statusCode: 200
  };
};

function sendEmail(email, licenseKey) {
  const data = {
    from: "Kait Moreno <kaitmore@gmail.com>",
    to: email,
    subject: "Your CopyPasta license key",
    text: `
Thanks for ordering CopyPasta! If you have any trouble or want a refund at any time, please don't hesitate to contact me personally at kaitmore@gmail.com.

Download here: https://github.com/kaitmore/copypasta-releases/releases/download/v1.0.0/copypasta-1.0.0.dmg

License email: ${email}
License number: ${licenseKey}

Thanks!
Kait
`
  };
  return _sendEmail(data);
}

function _sendEmail(data) {
  return new Promise((resolve, reject) => {
    mg.messages().send(data, function (error, body) {
      if (error) {
        reject(error);
      } else {
        resolve(body);
      }
    });
  });
}
