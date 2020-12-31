import React from "react"
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"

// import { withAuth, withLoginRequired } from "use-auth0-hooks"

function Profile({ auth }) {
  const { user } = useAuth0()
  // const { user } = auth
  return (
    <div>
      <main
        style={{
          margin: "5rem 10rem",
          fontSize: "1.25rem",
        }}
      >
        <h1>{`${user.nickname}'s profile`}</h1>
        <img
          src={user.picture}
          style={{ maxWidth: "100px", objectFit: "cover" }}
        />
        <p>
          <b>Nickname: </b>
          {user.nickname}
        </p>
        <p>
          <b>Name: </b>
          {user.name}
        </p>
        <p>
          <b>Email: </b>
          {user.email}
        </p>
        {/* <pre>{JSON.stringify(user || {}, null, 2)}</pre> */}
      </main>
    </div>
  )
}

// export default withLoginRequired(withAuth(Profile))
export default withAuthenticationRequired(Profile)
