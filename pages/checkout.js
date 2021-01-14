import { loadStripe } from "@stripe/stripe-js"
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"

import CheckoutForm from "../components/checkoutForm"

import styles from "../styles/CreditCard.module.css"

// const STRIPE_PK = 'pk_test_6pRNASCoBOKtIshFeQd4XMUh'
const STRIPE_PK =
  "pk_test_51I5EroGEcqGP7rtoC6NguX67BJ1urw0jMzJmWhNQM6btrQlqMsAzSp7TiKo93mW4iU7WHYqZ3dcWGEx6WrDufl0C00Thtrrt3v"

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(STRIPE_PK)

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: "https://fonts.googleapis.com/css?family=Roboto",
    },
  ],
}

export default function Checkout() {
  return (
    <div>
      <h1>Checkout</h1>

      <div className={styles.AppWrapper} options={ELEMENTS_OPTIONS}>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  )
}
