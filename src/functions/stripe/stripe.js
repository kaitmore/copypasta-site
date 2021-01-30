let { client, q } = require("./db.js");
const bcrypt = require("bcrypt");
const saltRounds =  process.env.SALT_ROUNDS || 10;

// Match the raw body to content type application/json
exports.handler = async function (req, context) {
  const event = JSON.parse(req.body);
  let resp;
  // Handle the event
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(paymentIntent.id, salt, function (err, hash) {
        // Store hash in database here
        resp = await client.query(
          q.Create(q.Collection("licenses"), {
            data: { [`${Math.random()}@gmail.com`]: hash }
          })
        );
      });
    });
    // Then define and call a method to handle the successful payment intent.
  } else {
    console.log(`Unhandled event type ${event.type}`);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(ret)
  };
};

function createLicenseKey() {}

function persistLicenseKey() {}
