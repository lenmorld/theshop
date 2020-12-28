import { GraphQLClient } from "graphql-request"

export default async (query, variables) => {
  // contentful API keys
  //   const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
  //   const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
  const accessToken = process.env.NEXT_PUBLIC_GRAPHCMS_ACCESS_TOKEN

  // `https://graphql.contentful.com/content/v1/spaces/${space}`

  const GRAPHCMS_ENDPOINT = `https://api-us-west-2.graphcms.com/v2/ckj68mpi9ybko01wag8cl3h8f/master`

  const graphcms = new GraphQLClient(GRAPHCMS_ENDPOINT, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  })

  //   console.log(JSON.stringify(request))

  // THIS DOESNT WORK WELL WITHE MUTATIONS
  //   const res = await fetch(GRAPHQL_ENDPOINT, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //     body: JSON.stringify(request),
  //   })

  // itemCollection(where: { title_contains: "mens" }) {

  const data = await graphcms.request(query, variables)

  //   const { data } = await res.json()

  return data
}
