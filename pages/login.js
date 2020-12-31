import React from "react"
import Router from "next/router"

// TODO: improve auth mechanism
export default function Login() {
  const login = () => {
    localStorage.setItem("userId", "lenmorld")
    Router.push("/secret")
  }

  return (
    <div>
      <h2>LOGIN COMPONENT</h2>
      <button onClick={login}>LOGIN</button>
    </div>
  )
}
