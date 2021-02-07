// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// handles a license key from a user and returns whether or not it is valid
exports.handler = async function (req, context) {
  let session;
  console.log("req", req);
  try {
    session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: "price_1IFLXvEZYj5kKn7UmP44B14B", quantity: 1 }],
      mode: "payment",
      success_url: "https://copypasta.sh/success",
      cancel_url: "https://copypasta.sh",
      allow_promotion_codes: true
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
