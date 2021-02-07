var stripe = Stripe(
  "pk_test_51IFLVtEZYj5kKn7ULGUCIwKBbKteduiUISH6BdAElXIJRkl1zrbiIVapUM7uhX5TWzgYFWPHq1vl7JznL1dodEL0008QISV5RB"
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
