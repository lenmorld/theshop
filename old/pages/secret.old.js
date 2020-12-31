import React, { useContext } from "react"

import Authentication from "../components/authentication"
import UserContext from "../components/userContext"

export function Secret() {
  const logout = () => {
    console.log("logout")
  }

  // SOLUTION 2: context
  //   return (
  //     <Authentication>
  //       <UserContext.Consumer>
  //         {(user) => {
  //           console.log(user)
  //           return (
  //             <>
  //               <h1>Secret page!</h1>
  //               <div>{user.name}</div>
  //               <button onClick={logout}>Logout</button>
  //             </>
  //           )
  //         }}
  //       </UserContext.Consumer>
  //     </Authentication>
  //   )

  // SOLUTION 3: context + render prop
  //   return (
  //     <Authentication
  //       render={(user) => {
  //         console.log(user)
  //         return (
  //           <>
  //             <h1>Secret page!</h1>
  //             <div>{user.name}</div>
  //             <button onClick={logout}>Logout</button>
  //           </>
  //         )
  //       }}
  //     />
  //   )

  // SOLUTION 4: useContext
  const user = useContext(UserContext)

  return (
    <>
      <h1>Secret page!</h1>
      <div>{user.name}</div>
      <button onClick={logout}>Logout</button>
    </>
  )
}

export default function AuthWrapper() {
  return (
    <Authentication>
      <Secret />
    </Authentication>
  )
}
