var cors = require('cors');
var express = require('express');
var bodyparser = require('body-parser');
var app = express();
app.use(bodyparser());
app.use(cors());

app.post('/checkout', function (req, res)
{
  var stripe = require("stripe")("sk_test_W9iu3JiJZLRRrUmodbq1fYhq");

	// (Assuming you're using express - expressjs.com)
	// Get the credit card details submitted by the form
	console.log("Processing Payment");

	var stripeToken = req.body.stripeToken;
	var amount = req.body.amount;
	//var stripeToken = "tok_17uA96J2xFzDJb7R5syadNzi";
	var charge = stripe.charges.create({
	  amount: amount, // amount in cents, again
	  currency: "usd",
	  source: stripeToken,
	  description: "Example charge"
	}, function(err, charge) {
	  if (err && err.type === 'StripeCardError') {
	    res.send("Error processing card");
	  }
	  else
	  {
	  	res.send("success");
	  }
	});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
