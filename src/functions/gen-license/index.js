let { setLicenseKey } = require("../../utils/db.js");
const bcrypt = require("bcrypt");
const mailgun = require("mailgun-js");
const { v4: uuidv4 } = require("uuid");

exports.handler = async function (req, context) {
  const event = JSON.parse(req.body);

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    const licenseKey = uuidv4();
    const salt = await genSalt();
    const hash = await genHash(salt, licenseKey);
    const email = paymentIntent.receipt_email || `kaitmore@gmail.com`;

    const DOMAIN = "email.copypasta.sh";
    const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN });
    const data = {
      from: "Excited User <me@samples.mailgun.org>",
      to: email,
      subject: "Hello",
      text: `Your License key is: ${licenseKey}`
    };
    mg.messages().send(data, function (error, body) {
      console.log(body);
    });

    try {
      await setLicenseKey(email, hash);
    } catch (e) {
      console.error(e);
      return {
        statusCode: 500,
        body: JSON.stringify(e)
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

function genSalt() {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        reject(err);
      } else {
        resolve(salt);
      }
    });
  });
}

function genHash(salt, password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, salt, function (err, hash) {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
}
