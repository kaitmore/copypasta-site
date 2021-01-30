let { setLicenseKey } = require("../../utils/db.js");
const bcrypt = require("bcrypt");

exports.handler = async function (req, context) {
  const event = JSON.parse(req.body);

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    const { salt } = await genSalt();
    const { hash } = await genHash(salt, paymentIntent.id);
    try {
      await setLicenseKey(`${Math.random()}@gmail.com`, hash);
    } catch (e) {
      console.error(e);
    }
  } else {
    console.log(`Unhandled event type ${event.type}`);
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
        resolve({
          salt
        });
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
        resolve({
          hash
        });
      }
    });
  });
}
