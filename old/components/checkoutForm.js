import React, { useEffect, useState } from 'react'

import {
	CardElement,
	Elements,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js'

import api from '../lib/shoppingCart'

import styles from '../styles/CheckoutForm.module.css'

// import styles from "../styles/CreditCard.module.css"

// const styles = {}

// const CARD_OPTIONS = {
//   iconStyle: "solid",
//   style: {
//     base: {
//       iconColor: "#c4f0ff",
//       color: "#fff",
//       fontWeight: 500,
//       fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
//       fontSize: "16px",
//       fontSmoothing: "antialiased",
//       ":-webkit-autofill": {
//         color: "#fce883",
//       },
//       "::placeholder": {
//         color: "#87bbfd",
//       },
//     },
//     invalid: {
//       iconColor: "#ffc7ee",
//       color: "#ffc7ee",
//     },
//   },
// }

// const ErrorMessage = ({ children }) => (
//   <div className={styles.ErrorMessage} role="alert">
//     <svg width="16" height="16" viewBox="0 0 17 17">
//       <path
//         fill="#FFF"
//         d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
//       />
//       <path
//         fill="#6772e5"
//         d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
//       />
//     </svg>
//     {children}
//   </div>
// )

// const SubmitButton = ({ processing, error, disabled, children }) => (
//   <button
//     className={
//       error ? styles.SubmitButton : styles["SubmitButton.SubmitButton--error"]
//     }
//     type="submit"
//     disabled={processing || disabled}
//   >
//     {processing ? "Processing..." : children}
//   </button>
// )

// const ResetButton = ({ onClick }) => (
//   <button type="button" className={styles.ResetButton} onClick={onClick}>
//     <svg width="32px" height="32px" viewBox="0 0 32 32">
//       <path
//         fill="#FFF"
//         d="M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z"
//       />
//     </svg>
//   </button>
// )

function Field({
	label,
	id,
	type,
	placeholder,
	required,
	autoComplete,
	value,
	onChange,
}) {
	return (
		<div>
			<label htmlFor={id} style={{ fontSize: '0.75rem' }}>
				{label}
			</label>
			<input
				id={id}
				type={type}
				placeholder={placeholder}
				required={required}
				autoComplete={autoComplete}
				value={value}
				onChange={onChange}
			/>
		</div>
	)
}

export default function CheckoutForm({ cartItems }) {
	const stripe = useStripe()
	const elements = useElements()

	const [amount, setAmount] = useState(0)
	const [currency, setCurrency] = useState('')
	const [clientSecret, setClientSecret] = useState(null)

	const [succeeded, setSucceeded] = useState(false)

	const [successData, setSuccessData] = useState(null)
	const [error, setError] = useState(null)

	const [cardComplete, setCardComplete] = useState(false)
	const [processing, setProcessing] = useState(false)
	//   const [paymentMethod, setPaymentMethod] = useState(null)
	const [billingDetails, setBillingDetails] = useState({
		email: '',
		phone: '',
		name: '',
	})

	// when checkout form is loaded, get cart details
	// for now, just get total amount
	// TODO: get all cart details
	useEffect(() => {
		// Step 1: Fetch product/cart details from API
		// to make sure it can't be tampered with in the client

		// TODO: save and get cart items from/to serverless functions + GraphCMS instead of localStorage
		// async function fetchCart() {
		// 	const cart = await api.getCartDetails()
		// 	setAmount(cart.amount)
		// 	setCurrency(cart.currency)
		// }

		async function fetchCart() {
			// TEMP: get from props from local storage
			const total = cartItems.reduce((acc, curr) => {
				return acc + curr.price * curr.orderCount
			}, 0)

			// const cart = await api.getCartDetails()
			setAmount(total)
			setCurrency('CAD')
		}

		// Step 2: Create PaymentIntent over Stripe API
		async function createPayment() {
			let paymentClientSecret

			try {
				paymentClientSecret = await api.createPaymentIntent({
					payment_method_types: ['card'],
				})
				setClientSecret(paymentClientSecret)
			} catch (e) {
				setError(e.message)
			}
		}

		fetchCart()
		createPayment()
	}, [])

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!stripe || !elements) {
			// Stripe.js not loaded yet. Form submission must be disabled
			return
		}

		if (error) {
			elements.getElement('card').focus()
			return
		}

		if (cardComplete) {
			setProcessing(true)
		}

		// Create payment method
		// OPTIONAL when using Payment Intent
		// const payload = await stripe.createPaymentMethod({
		//   type: "card",
		//   card: elements.getElement(CardElement),
		//   billing_details: billingDetails,
		// })

		// STEP 3: Confirm payment with stripe
		// using PaymentIntent clientSecret and CardElement
		const payload = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement),
				billing_details: billingDetails,
			},
		})

		setProcessing(false)

		if (payload.error) {
			setError(`Payment failed: ${payload.error.message}`)
			console.error('[error]', payload.error)
		} else {
			//   setPaymentMethod(payload.paymentMethod)
			setError(null)
			setSucceeded(true)
			setSuccessData(payload.paymentIntent)
			console.log('[PaymentIntent]', payload.paymentIntent)
		}
	}

	const reset = () => {
		setError(null)
		setSucceeded(false)
		setSuccessData(null)
		setProcessing(false)
		// setPaymentMethod(null)
		setBillingDetails({
			email: '',
			phone: '',
			name: '',
		})
	}

	//   return paymentMethod ? (
	//     <div className={styles.Result}>
	//       <div className={styles.ResultTitle} role="alert">
	//         Payment successful
	//       </div>
	//       <div className={styles.ResultMessage}>
	//         Thanks for trying Stripe Elements. No money was charged, but we
	//         generated a PaymentMethod:
	//         {paymentMethod.id}
	//       </div>
	//       <ResetButton onClick={reset} />
	//     </div>
	//   ) :

	const renderSuccess = () => {
		return (
			<div className="sr-field-success message">
				<h1>Your test payment succeeded</h1>
				<p>View PaymentIntent response:</p>
				<pre className="sr-callout">
					<code>{JSON.stringify(successData, null, 2)}</code>
				</pre>
				<button onClick={reset}>RESET</button>
			</div>
		)
	}

	const renderForm = () => {
		const options = {
			style: {
				base: {
					color: '#32325d',
					fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
					fontSmoothing: 'antialiased',
					fontSize: '16px',
					'::placeholder': {
						color: '#aab7c4',
					},
				},
				invalid: {
					color: '#fa755a',
					iconColor: '#fa755a',
				},
			},
		}

		return (
			<form onSubmit={handleSubmit}>
				<h1>
					{currency.toLocaleUpperCase()}{' '}
					{amount.toLocaleString(
						typeof window !== 'undefined' ? navigator.language : 'en',
						{
							minimumFractionDigits: 2,
						},
					)}{' '}
				</h1>
				<h4>Finalize order</h4>

				<div>
					{/* <div>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              autoComplete="cardholder"
              className="sr-input"
            />
          </div> */}
					<fieldset>
						<Field
							label="Name"
							id="name"
							type="text"
							placeholder="John Doe"
							required
							autoComplete="name"
							value={billingDetails.name}
							onChange={(e) => {
								setBillingDetails({
									...billingDetails,
									name: e.target.value,
								})
							}}
						/>
						<Field
							label="Email"
							id="email"
							type="email"
							autoComplete="email"
							placeholder="johndoe@example.com"
							required
							value={billingDetails.email}
							onChange={(e) => {
								setBillingDetails({
									...billingDetails,
									email: e.target.value,
								})
							}}
						/>
						<Field
							label="Phone"
							id="phone"
							type="tel"
							autoComplete="tel"
							placeholder="(438) 123-1234"
							required
							value={billingDetails.phone}
							onChange={(e) => {
								setBillingDetails({
									...billingDetails,
									phone: e.target.value,
								})
							}}
						/>
					</fieldset>

					<div>
						<CardElement
							options={options}
							onChange={(e) => {
								if (e.error) {
									console.error(e)
									setError(e.error.message)
								} else {
									// value well-formed -> enable form submission
									setCardComplete(e.complete)
								}
							}}
						/>
					</div>
				</div>

				{error && <div className="message sr-field-error">{error}</div>}

				<button
					className="btn"
					disabled={processing || !clientSecret || !stripe}
					type="submit"
				>
					{processing ? 'Processing…' : 'Pay'}
				</button>
			</form>
		)
	}

	return (
		<div className="checkout-form">
			<div className="sr-payment-form">
				<div className="sr-form-row" />
				{succeeded ? renderSuccess() : renderForm()}
			</div>
		</div>
	)
}
