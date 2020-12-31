import React from "react"
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"

// import { withAuth, withLoginRequired } from "use-auth0-hooks"

function Secret({ auth }) {
  const { user } = useAuth0()
  // const { user } = auth
  return (
    <div>
      <h1>Secret</h1>
      <p>This is the profile page.</p>
      <pre>{JSON.stringify(user || {}, null, 2)}</pre>
    </div>
  )
}

// export default withLoginRequired(withAuth(Profile))
export default withAuthenticationRequired(Secret)
