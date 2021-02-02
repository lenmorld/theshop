import React, { useState, useEffect } from 'react'

import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import { useRouter } from 'next/router'

import CheckoutForm from '../components/checkoutForm'

const { NEXT_PUBLIC_STRIPE_PK } = process.env

const ELEMENTS_OPTIONS = {
	fonts: [
		{
			cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
		},
	],
}

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(NEXT_PUBLIC_STRIPE_PK)

export default function Checkout() {
	const router = useRouter()

	const [cartItems, setCartItems] = useState(() => {
		if (typeof window !== 'undefined') {
			return JSON.parse(localStorage.getItem('shoppy_cart') || '[]')
		}
		return []
	}, [])

	const total = cartItems.reduce((acc, curr) => {
		return acc + curr.price * curr.orderCount
	}, 0)

	const currency = 'CAD'

	const onOrderSuccess = ({ successData }) => {
		// TODO: save order in DB, so redirect page can query order
		if (typeof window !== 'undefined') {
			localStorage.setItem(
				'shoppy_order_success_details',
				JSON.stringify(successData),
			)
		}

		router.push(
			router.push({
				// pathname: '/post/[pid]', // TODO: generate an order ID
				pathname: '/order-success',
				// query: { pid: post.id },
			}),
		)
	}

	return (
		<main>
			<h1>Checkout</h1>
			{/* TODO: Order summary */}

			<Elements stripe={stripePromise}>
				<CheckoutForm
					amount={total}
					currency={currency}
					onOrderSuccess={onOrderSuccess}
				/>
			</Elements>
		</main>
	)
}
