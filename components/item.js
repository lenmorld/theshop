import React, { useState, useEffect } from "react"

import styles from "../styles/Home.module.css"

import requestGraphQL from "../lib/graphql"

export default function Item({ item: _item }) {
  const [item, setItem] = useState(_item)

  const sendMutation = async () => {
    const data = await requestGraphQL(
      `mutation {
            updateItem(where: {
              id: "${item.id}"
            }, data: {
              stock: ${item.stock - 1}
            }) {
              id
              stock
            }
          }
          `,
    )

    // console.log(`graphql result:`, data)

    // PUBLISH
    await requestGraphQL(
      `mutation {
            publishItem(where: {
              id: "${item.id}"
            }, to:PUBLISHED) {
              id,
              stock
            }
          }
          `,
    )

    console.log(data.updateItem)

    setItem({
      ...item,
      ...data.updateItem,
    })
    // return {
    //   props: {
    //     items: data.updateItem,
    //   },
    // }
  }

  return (
    <div className={styles.card}>
      <h3>{item.name}</h3>
      <div style={{ margin: "1rem 0" }}>
$
{item.price}
      </div>
      <img
        alt={item.name}
        src={item.imageUrl}
        style={{
          width: "200px",
          height: "200px",
          objectFit: "cover",
        }}
      />
      <p>{item.description}</p>
      <div
        style={{
          margin: "1rem 0",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* <button className={styles.buttonPrimary}>Add to cart</button> */}
        <button className="buttonPrimary" onClick={sendMutation}>
          Test button
        </button>
        <div style={{ display: "inline-block" }}>
          <div style={{ fontWeight: "bold" }}>Stock</div>
          <div>{item.stock}</div>
        </div>
      </div>
    </div>
  )
}
