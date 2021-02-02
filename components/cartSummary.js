import ReactDOM from 'react-dom'
import Link from 'next/link'
import { AiOutlineCheck } from 'react-icons/ai'

import { formatCurrency } from '../lib/formats'

const Modal = ({ children, styles, onHide }) => {
	return ReactDOM.createPortal(
		<div style={{ position: 'relative' }}>
			<div
				style={{
					position: 'fixed',
					width: '100%',
					height: '100%',
					background: 'gray',
					top: 0,
					left: 0,
					opacity: '0.8',
				}}
				onClick={onHide}
			>
				{/* backdrop */}
			</div>
			<div
				style={{
					position: 'fixed',
					top: '6rem',
					right: '2rem',
					border: '1px solid gray',
					borderRadius: '10px',
					overflow: 'hidden',
				}}
			>
				{/* content */}
				{children}
			</div>
		</div>,
		document.getElementById('portal'),
	)
}

/*
#portal {
  position: fixed;
  top: 6rem;
  right: 2rem;
  border: 1px solid black;
}
*/

// inside the #portal
const containerStyles = {
	padding: '1.5rem',
	maxWidth: '500px',
	background: 'white',
}

export default function CartSummary({ items, hideCart }) {
	// console.log(items)
	return (
		<Modal onHide={hideCart}>
			<div style={containerStyles}>
				<div
					style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
				>
					<AiOutlineCheck style={{ color: 'green' }} />
					<span>&nbsp;</span>
					<span style={{ fontSize: '0.875rem' }}>
						Item successfully added to cart
					</span>
				</div>
				{/* Cart items - TODO: DRY with checkout form */}
				<ul style={{ display: 'flex', flexDirection: 'column' }}>
					{items.map((item) => (
						<li
							key={item.id}
							style={{ display: 'flex', justifyContent: 'space-between' }}
						>
							<div style={{ flexBasis: '10%', margin: '0.5rem 0' }}>
								<img
									src={item.imageUrl}
									style={{ height: '100px', width: '100px', objectFit: 'contain' }}
								/>
							</div>
							<div style={{ flexBasis: '70%' }}>
								<h3>{item.name} </h3>
								<div>
									{item.orderCount} x {formatCurrency(item.price)}
								</div>
							</div>
						</li>
					))}
				</ul>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<button
						className="buttonPrimary"
						style={{ marginTop: '2rem' }}
						onClick={hideCart}
					>
						Continue Shopping
					</button>
					<Link href="/cart">
						<button className="buttonPrimary success" style={{ marginTop: '2rem' }}>
							Proceed to Cart
						</button>
					</Link>
				</div>
			</div>
		</Modal>
	)
}
