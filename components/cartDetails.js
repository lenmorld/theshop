import React, { useState } from 'react'

import { formatCurrency } from '../lib/formats'

export default function CartDetails() {
	const [cartItems, setCartItems] = useState(() => {
		if (typeof window !== 'undefined') {
			return JSON.parse(localStorage.getItem('shoppy_cart') || '[]')
		}
		return []
	}, [])

	return (
		<div>
			<h2>Cart Details</h2>

			{/* cart items - TODO DRY with cartSummary */}
			<div
				className="cartItemsTable"
				style={{
					display: 'grid',
					gridTemplateColumns: '2fr 5fr 1fr 1fr 1fr',
					margin: '2rem',
				}}
			>
				{/* headers */}
				<div className="header">item</div>
				<div className="header">details</div>
				<div className="header number">quantity</div>
				<div className="header number">price</div>
				<div className="header number">subtotal</div>
				{/* data */}
				{cartItems.map((item) => {
					return (
						<React.Fragment key={item.id}>
							<div className="cell">
								<img
									src={item.imageUrl}
									style={{ height: '100px', width: '100px', objectFit: 'contain' }}
								/>
							</div>
							<div
								className="cell"
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'flex-start',
								}}
							>
								<div style={{ marginBottom: '1rem' }}>
									<strong>{item.name}</strong>
								</div>
								<div className="description">{item.description}</div>
							</div>
							<div className="cell number">{item.orderCount}</div>
							<div className="cell number">{formatCurrency(item.price)}</div>
							<div className="cell number">
								{formatCurrency(item.orderCount * item.price)}
							</div>
						</React.Fragment>
					)
				})}
			</div>
		</div>
	)
}
