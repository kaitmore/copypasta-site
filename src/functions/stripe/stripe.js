let { client, q } = require("./db.js");

// Match the raw body to content type application/json
exports.handler = async function (req, context) {
  const event = JSON.parse(req.body);

  // Handle the event
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    console.log(paymentIntent);
    // Then define and call a method to handle the successful payment intent.
  } else {
    console.log(`Unhandled event type ${event.type}`);
  }
  const ret = await client.query(
    q.Create(q.Collection("licenses"), {
      data: { title: "What I had for breakfast .." }
    })
  );

  return {
    statusCode: 200,
    body: JSON.stringify(ret)
  };
};

function createLicenseKey() {}

function persistLicenseKey() {}
