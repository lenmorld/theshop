import React from "react"
import "../styles/globals.css"
import "../styles/checkout.css"

// import { Auth0Provider } from "use-auth0-hooks"
import { Auth0Provider } from "@auth0/auth0-react"
import Router from "next/router"
import Navbar from "../components/navbar"

function MyApp({ Component, pageProps }) {
  // console.log(window.location.origin)

  const onRedirectCallback = (appState) => {
    console.log(appState)
    Router.push(
      appState && appState.returnTo
        ? appState.returnTo
        : window.location.pathname,
    )
  }

  const redirect = process.browser
    ? window.location.origin
    : "http://localhost:3000"

  return (
    <Auth0Provider
      domain="lennythedev.us.auth0.com"
      clientId="4cJOjlz8EIB133IVXf74VXlV3oua3S6o"
      redirectUri={redirect}
      onRedirectCallback={onRedirectCallback}
    >
      <header>
        <Navbar />
      </header>
      <Component {...pageProps} />
    </Auth0Provider>
  )
}

export default MyApp
