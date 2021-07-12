import React, { useState, useEffect } from "react"

import styles from "../styles/Products.module.css"

import Item from "../components/item"

import requestGraphQL from "../lib/graphql"
import CartSummary from "../components/cartSummary"

/*
	Products is the root component that holds products and cart items
*/
export default function Products({ items }) {
  // console.log(items)
  // const [products, setProducts] = useState(items)
  const [cartItems, setCartItems] = useState([])
  const [cartVisible, setCartVisible] = useState(false)

  // get from localStorage on mount
  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem("shoppy_cart") || "[]"))
  }, [])

  const addToCart = (item) => {
    // +1 count if already there
    let newCartItems
    if (cartItems.find((_item) => _item.id === item.id)) {
      newCartItems = cartItems.map((_item) =>
        _item.id === item.id
          ? { ..._item, orderCount: _item.orderCount + 1 }
          : _item,
      )
    } else {
      newCartItems = [
        ...cartItems,
        {
          ...item,
          orderCount: 1,
        },
      ]
    }

    setCartItems(newCartItems)

    if (newCartItems.length) {
      setCartVisible(true)
    }

    // save to local storage
    localStorage.setItem("shoppy_cart", JSON.stringify(cartItems))
  }

  const hideCart = () => {
    setCartVisible(false)
  }

  return (
    <main>
      <h1>Shoppy</h1>

      <div className={styles.grid}>
        {items.map((item) => (
          <Item key={item.id} item={item} addToCart={() => addToCart(item)} />
        ))}
      </div>
      <div>
        {cartVisible && <CartSummary items={cartItems} hideCart={hideCart} />}
      </div>
    </main>
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
