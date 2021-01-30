// Match the raw body to content type application/json
exports.handler = async function (event, context) {
  console.log("event", event);
  console.log("event.body.type", event.body.type);
  // Handle the event
  switch (event.body.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      console.log(paymentIntent);
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break;
    case "payment_method.attached":
      const paymentMethod = event.data.object;
      console.log(paymentMethod);
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
};
