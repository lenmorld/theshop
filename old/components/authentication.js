import React, { useEffect } from "react"
import Router from "next/router"
import UserContext from "./userContext"

export default function Authentication({ children }) {
  let user
  if (typeof window !== "undefined") {
    user = localStorage && localStorage.getItem("userId")
  }

  if (!user) {
    if (typeof window !== "undefined") {
      Router.push("/login")
    }
  } else {
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>
  }
  return <p>Redirecting...</p>
}

// USAGE:
// export default function AuthWrapper() {
//   return (
//     <Authentication>
//       <SomeComponent />
//     </Authentication>
//   )
// }

// TODO: clean it up with React.createElement or something
// such that consumer won't need an AuthWrapper anymore

// export default function AuthWrapper(func) {
//   return <Authentication>{func}</Authentication>
// }
