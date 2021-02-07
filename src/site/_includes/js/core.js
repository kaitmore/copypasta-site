var stripe = Stripe(
  "pk_live_51IFLVtEZYj5kKn7UwCTDiL2O9YyI1QrrxT9XUrZhBUbPBradRMFQKhckjA3CgrkyieRreU8MxB5sDVfc8tfqPUMR00txcBkYex"
);
var checkoutButton = document.getElementById("checkout-button");

checkoutButton.addEventListener("click", function () {
  // Create a new Checkout Session using the server-side endpoint you
  // created in step 3.
  fetch("/api/checkout", {
    method: "POST"
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (session) {
      console.log(session);
      return stripe.redirectToCheckout({ sessionId: session.id });
    })
    .then(function (result) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, you should display the localized error message to your
      // customer using `error.message`.
      if (result.error) {
        alert(result.error.message);
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
});
