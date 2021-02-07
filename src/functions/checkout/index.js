// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// handles a license key from a user and returns whether or not it is valid
exports.handler = async function (req, context) {
  console.log("REQ", req);
  let session;
  try {
    session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      lineItems: [{ price: "price_1IIDzYEZYj5kKn7UluwG4CiT", quantity: 1 }],
      mode: "payment",
      success_url: "https://copypasta.sh/success",
      cancel_url: "https://copypasta.sh/cancel"
    });
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e)
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify({ id: session.id })
  };
};
