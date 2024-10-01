const { Paynow } = require("../dist");

async function initiatePayment() {
	// Create instance of Paynow class
	let paynow = new Paynow("00000", "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");

	// Set return and result urls
	paynow.resultUrl = "https://mysite.co.zw/paynow/update";
	paynow.returnUrl =
		"https://mysite.co.zw/paynow/return?merchantReference=1234";
	// The return url can be set at later stages. You might want to do this if you want to pass data to the return url (like the reference of the transaction)

	const authEmail = "example@mywebsite.tld";

	// Create a new payment
	const payment = paynow.createPayment("Invoice 35", authEmail);

	// Add items to the payment list passing in the name of the item and it's price
	payment.add("Order 35", 200.0);

	await paynow
		.sendMobile(
			// The payment to send to Paynow
			payment,

			// The phone number making payment
			"0771111111",

			// The mobile money method to use.
			"ecocash"
		)
		.then(function (response) {
			if (response.success) {
				// These are the instructions to show the user.
				// Instruction for how the user can make payment
				let instructions = response.instructions; // Get Payment instructions for the selected mobile money method

				// Get poll url for the transaction. This is the url used to check the status of the transaction.
				// You might want to save this, we recommend you do it
				let pollUrl = response.pollUrl;

				console.log("instructions", instructions);
				console.log("pollUrl", pollUrl);
			} else {
				console.log(response.error);
			}
		})
		.catch((ex) => {
			// Ahhhhhhhhhhhhhhh
			// *freak out*
			console.log("Your application has broken an axle", ex);
		});
}

initiatePayment();
