const { client, q } = require("./db.js");

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
  client
    .query(
      q.Create(q.Collection("licenses"), {
        data: { title: "What I had for breakfast .." }
      })
    )
    .then((ret) => {
      return {
        statusCode: 200,
        body: JSON.stringify(ret)
      };
    })
    .catch((e) => {
      console.log(e);
      return {
        statusCode: 500,
        body: JSON.stringify(e)
      };
    });
};

function createLicenseKey() {}

function persistLicenseKey() {}
