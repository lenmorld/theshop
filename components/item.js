import React, { useState, useEffect } from "react"

import styles from "../styles/Item.module.css"

import requestGraphQL from "../lib/graphql"

import { formatCurrency } from "../lib/formats"

export default function Item({ item, addToCart }) {
  // const [item, setItem] = useState(_item)

  // console.log('item: ', item)

  return (
    <div className={styles.item}>
      <h3>{item.name}</h3>
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
        {/* <button className="buttonPrimary" onClick={sendMutation}> */}
        <button className="buttonPrimary" onClick={addToCart}>
          Add to cart
        </button>
        <div style={{ margin: "1rem 0" }}>{formatCurrency(item.price)}</div>
        {/* <div style={{ display: 'inline-block' }}>
					<div style={{ fontWeight: 'bold' }}>Stock</div>
					<div>{item.stock}</div>
				</div> */}
      </div>
    </div>
  )
}
