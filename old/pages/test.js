import React, { useEffect, useContext } from "react"
import Router from "next/router"

function SecretPage({ user }) {
  return (
    <div>
      <h1>
        Logged in:
        {user.name}
      </h1>
    </div>
  )
}

export default function Test() {
  useEffect(() => {
    setTimeout(() => {
      const user = null
      //   const user = {
      //     name: "Lenny",
      //   }

      //   if (user) {
      //     // render "secret" component
      //     return <SecretPage user={user} />
      //   }
      // redirect to Login
      // client-side
      if (typeof window !== "undefined") {
        Router.push("/test2")
      } else {
        // server-side
        return <h1>Testy</h1>
      }
    }, 2000)
  }, [])

  // temp. state
  return <p>Loading...</p>
}
