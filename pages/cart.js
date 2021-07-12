import Link from "next/link"
import CartDetails from "../components/cartDetails"

export default function Cart() {
  return (
    <main>
      <CartDetails />
      <Link href="/checkout">
        <button className="buttonPrimary success">Proceed to Checkout</button>
      </Link>
    </main>
  )
}
