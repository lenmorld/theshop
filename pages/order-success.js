import React, { useState } from 'react'
import { AiOutlineCheck } from 'react-icons/ai'
import CartDetails from '../components/cartDetails'

// TODO: fix import and move formatFullDateTime to '../lib/formats'
// export { formatFullDateTime } from '../lib/formats'

export function formatFullDateTime(unixTimeStamp) {
	return (
		unixTimeStamp &&
		new Intl.DateTimeFormat('en-CA', {
			dateStyle: 'full',
			timeStyle: 'long',
		}).format(new Date(unixTimeStamp * 1000))
	)
}

export default function OrderSuccess({ successData }) {
	const [orderDetails, setOrderDetails] = useState(() => {
		if (typeof window !== 'undefined') {
			return JSON.parse(
				localStorage.getItem('shoppy_order_success_details') || '[]',
			)
		}
		return []
	}, [])

	return (
		<main>
			<h1>Thank you for your purchase</h1>
			{/* <h1>Your test payment succeeded</h1> */}
			{/* <p>View PaymentIntent response:</p> */}
			{/* <pre>
				<code>{JSON.stringify(successData, null, 2)}</code>
			</pre> */}
			<div>
				<ul>
					<li>
						<strong>Order Number</strong>: {orderDetails.id}
					</li>
					<li>
						<strong>Order Date</strong>: {formatFullDateTime(orderDetails.created)}
					</li>
					<li>
						<strong>Order Status</strong>: Completed
						<span> ✅</span>
					</li>
				</ul>
				<CartDetails />
			</div>
		</main>
	)
}
