import React, { Component } from "react"
import UserContext from "./userContext"

// TODO: include user query here to GraphCMS to validate user
const user = {
  name: "Lenny",
}
// const user = null

export default function Authentication({ children }) {
  if (!user) {
    return <div>Sign in</div>
  }

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

// USAGE:
/*
export default function AuthWrapper() {
  return (
    <Authentication>
      <Secret />
    </Authentication>
  )
}
*/

// TODO: clean it up with React.createElement or something
// such that consumer won't need an AuthWrapper anymore

// export default function AuthWrapper(func) {
//   return <Authentication>{func}</Authentication>
// }
