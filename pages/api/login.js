import requestGraphQL from "../../lib/graphql"

// TODO: make it more secure by using tokens instead

export default async (req, res) => {
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
      login: "user1",
    },
  )

  console.log(data)

  res.json({
    props: {
      customer: data.customer,
    },
  })

  // res.statusCode = 200
  // res.json({ name: "John Doe" })
}
