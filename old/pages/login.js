import React, { useState } from "react"
import Router from "next/router"

import requestGraphQL from "../lib/graphql"

export default function Login() {
  const [login, setLogin] = useState()
  const [password, setPassword] = useState()

  const onSubmit = async () => {
    const data = await requestGraphQL(
      `query($login: String!) {
          customer(where: { login: $login }) {
            id
            name
            login
          }
        }
      `,
      {
        login,
      },
    )

    console.log(data)

    if (data.customer) {
      localStorage.setItem("userId", "lenmorld")
      Router.push("/secret")
    } else {
      console.error("LOGIN FAILED")
    }
  }

  return (
    <div>
      <h2>LOGIN COMPONENT</h2>
      <label>
        Login
        <input type="text" onChange={(e) => setLogin(e.target.value)} />
      </label>
      <label>
        Password
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button onClick={onSubmit}>LOGIN</button>
      <div>
        {login}
        {password}
      </div>
    </div>
  )
}
