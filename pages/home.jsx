import styles from "../styles/Home.module.css"

import Item from "./item"

import requestGraphQL from "../lib/graphql"

/*
  const { createVote } = await graphcms.request(
    `mutation upvoteProduct($id: ID!) {
      createVote(data: { product: { connect: { id: $id } } }) {
        id
      }
    }`,
    { id: body.id }
  );
*/

export default function Home({ items }) {
  // console.log(items)

  return (
    <div>
      <main className={styles.main}>
        <h1 className={styles.name}>Shoppy</h1>

        <div className={styles.grid}>
          {items.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </div>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const data = await requestGraphQL(
    `query {
        items {
          id
          name
          price
          description
          imageUrl
          stock
        }
      }
    `,
  )

  // debugger
  // console.log(`graphql result:`, data)

  return {
    props: {
      items: data.items,
    },
  }
}
