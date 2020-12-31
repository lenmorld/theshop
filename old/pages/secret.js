import React, { useContext } from "react"
import Router from "next/router"

// import Authentication from "../components/authentication"
// import UserContext from "../components/userContext"

export default function Secret() {
  // const user = useContext(UserContext)
  // console.log(user)

  return (
    <div>
      <h1>Secret page!</h1>
      {/* <div>{user.name}</div> */}
      <button onClick={logout}>Logout</button>
    </div>
  )
}

// function Wrapper() {
//   const logout = () => {
//     if (typeof window !== "undefined") {
//       localStorage && localStorage.removeItem("userId")
//       Router.push("/")
//     }
//   }

//   // SOLUTION 4: useContext
//   const user = useContext(UserContext)
//   console.log(user)

//   return (
//     <div>
//       <h1>Secret page!</h1>
//       <div>{user.name}</div>
//       <button onClick={logout}>Logout</button>
//     </div>
//   )
// }

// export default function Secret() {
//   return (
//     <Authentication>
//       <Wrapper />
//     </Authentication>
//   )
// }
