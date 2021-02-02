import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { AiOutlineShoppingCart } from 'react-icons/ai'
import { FaShoppingCart } from 'react-icons/fa'

// import { useAuth } from "use-auth0-hooks"
import { useAuth0 } from '@auth0/auth0-react'

const NavLink = ({ path, action, title, children, render }) => {
	const { pathname } = useRouter()

	return (
		<li>
			{path && (
				<Link href={path}>
					<a>
						{children || (render && render(pathname === path)) || (
							<div className={pathname === path ? 'active' : ''}>{title}</div>
						)}
					</a>
				</Link>
			)}
			{action && (
				<button className="buttonFlat" onClick={action}>
					{title}
				</button>
			)}
		</li>
	)
}

export default function NavBar() {
	const { pathname, query } = useRouter()
	const {
		isAuthenticated,
		isLoading,
		loginWithRedirect,
		logout,
		error,
		user,
	} = useAuth0()

	const onLogin = () => {
		// login({ appState: { returnTo: { pathname, query } } })
		loginWithRedirect({
			redirect_uri: window.location.origin,
		})
	}

	const onLogOut = () => {
		logout({ returnTo: 'http://localhost:3000' })
	}

	return (
		<nav>
			<ul>
				<NavLink path="/">
					<h2>Shoppy</h2>
				</NavLink>
				<NavLink path="/products" title="Browse" />
				<NavLink path="/about" title="About" />
				{!isLoading &&
					(isAuthenticated ? (
						<>
							<NavLink path="/profile" title="Profile" />
							<NavLink action={onLogOut} title="Log out" />
						</>
					) : (
						<NavLink action={onLogin} title="Log in" />
					))}
				<NavLink
					path="/cart"
					render={(active) => {
						return active ? (
							<FaShoppingCart style={{ fontSize: '1.25rem' }} />
						) : (
							<AiOutlineShoppingCart style={{ fontSize: '1.25rem' }} />
						)
					}}
				/>
			</ul>
		</nav>
	)
}
