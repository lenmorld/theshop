import React from "react"
import UserContext from "./userContext"

// TODO: include user query here to GraphCMS to validate user
const user = {
  name: "Lenny",
}
// const user = null

// SOLUTION 1: wrapper component
// export default function Authentication({ children }) {
//   if (!user) {
//     return <div>Sign in</div>
//   }
//   return children
// }

// SOLUTION 2: context
// export default function Authentication({ children }) {
//   if (!user) {
//     return <div>Sign in</div>
//   }

//   return <UserContext.Provider value={user}>{children}</UserContext.Provider>
// }

// SOLUTION 3: context + render-prop
// export default function Authentication({ render }) {
//   if (!user) {
//     return <div>Sign in</div>
//   }

//   return (
//     <UserContext.Provider value={user}>
//       <UserContext.Consumer>{(_user) => render(_user)}</UserContext.Consumer>
//     </UserContext.Provider>
//   )
// }

// SOLUTION 4: useContext hook
export default function Authentication({ children }) {
  if (!user) {
    return <div>Sign in</div>
  }

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}
