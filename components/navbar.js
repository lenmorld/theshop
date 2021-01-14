import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"

// import { useAuth } from "use-auth0-hooks"
import { useAuth0 } from "@auth0/auth0-react"

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

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/products">
              <a>Browse</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          {!isLoading &&
            (isAuthenticated ? (
              <>
                <li>
                  <Link href="/profile">
                    <a>Profile</a>
                  </Link>
                </li>
                <li>
                  <button
                    className="buttonFlat"
                    onClick={() =>
                      logout({ returnTo: "http://localhost:3000" })
                    }
                  >
                    Log out
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button className="buttonFlat" onClick={onLogin}>
                  Log in
                </button>
              </li>
            ))}
        </ul>
      </nav>
    </header>
  )
}
