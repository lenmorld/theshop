import React, { useState, useEffect } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import api from '../lib/shoppingCart'

const config = {}

export default function CardPayment({ total, currency }) {
	const stripe = useStripe()
	const elements = useElements()

	const [error, setError] = useState(null)
	const [complete, setComplete] = useState(false)
	const [clientSecret, setClientSecret] = useState(null)

	// STEP 1: amount, currency from props

	useEffect(() => {
		// STEP 2: Create PaymentIntent over Stripe API
		async function createPayment(params) {
			try {
				const paymentClientSecret = await api.createPaymentIntent({
					payment_method_types: ['card'],
				})

				setClientSecret(paymentClientSecret)
			} catch (e) {
				setError(e.message)
			}
		}

		createPayment()
		// return () => {
		//     cleanup
		// }
	}, []) // do it on load

	const changeCardDetails = (e) => {
		if (e.error) {
			console.error(e)
			setError(e.error.message)
		} else {
			// form complete with valid inputs -> enable submit
			setComplete(e.complete)
		}
	}

	return (
		<div>
			<h2>Payment Info</h2>

			<CardElement options={config} onChange={changeCardDetails} />

			<button onClick>SUBMIT</button>
		</div>
	)
}
