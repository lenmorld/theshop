// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const STRIPE_SECRET_KEY =
	'sk_test_51I5EroGEcqGP7rtoa48iD8bQxNO7yJBkQtrwbhwdSbfT70j3ZGRtU0uZETq0TkrPXy6bXS0r4JRRsuczvX0ubArO00M9GFywDC'

const stripe = require('stripe')(STRIPE_SECRET_KEY)

export default async (req, res) => {
	// const { body } = req

	console.log(req.body)

	const { amount, currency } = req.body

	// https://stripe.com/docs/api/payment_intents/create

	const options = {
		payment_method_types: ['card'],
		// amount: "1000",
		// currency: "CAD",
		// amount has to be integer
		// https://stripe.com/docs/api/payment_intents/object#payment_intent_object-amount
		amount: Math.ceil(amount),
		currency,
	}

	try {
		const paymentIntent = await stripe.paymentIntents.create(options)
		res.json(paymentIntent)
	} catch (err) {
		res.json(err)
	}

	// res.statusCode = 200
	// res.json({ name: "John Doe", body: req.body })
}
