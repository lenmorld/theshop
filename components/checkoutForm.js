import React, { useState, useEffect } from "react"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import api from "../lib/shoppingCart"

import CustomerFields from "./customerFields"
// import OrderSuccess from './orderSuccess'

const config = {}

const initialBillingDetails = {
  phone: "",
  email: "",
  firstname: "",
  lastname: "",
  address1: "",
  address2: "",
  city: "",
  postal: "",
  province: "",
  country: "",
}

export default function CheckoutForm({ amount, currency, onOrderSuccess }) {
  const stripe = useStripe()
  const elements = useElements()

  const [error, setError] = useState(null)
  const [cardComplete, setCardComplete] = useState(false)
  const [clientSecret, setClientSecret] = useState(null)
  const [cardProcessing, setCardProcessing] = useState(false)

  const [succeeded, setSucceeded] = useState(false)
  const [successData, setSuccessData] = useState(false)

  const [billingDetails, setBillingDetails] = useState(initialBillingDetails)

  const changeInput = (e) => {
    setBillingDetails((prevBillingDetails) => ({
      ...prevBillingDetails,
      [e.target.id]: e.target.value,
    }))
  }

  // STEP 1: amount, currency from props

  // STEP 2: Create PaymentIntent over Stripe API
  useEffect(() => {
    async function createPayment() {
      try {
        const paymentClientSecret = await api.createPaymentIntent({
          payment_method_types: ["card"],
          amount,
          currency,
        })

        setClientSecret(paymentClientSecret)
      } catch (e) {
        setError(e.message)
      }
    }

    createPayment()
    // return () => {
    //     cleanup
    // }
  }, []) // do it on load

  const changeCardDetails = (e) => {
    if (e.error) {
      console.error(e)
      setError(e.error.message)
    } else {
      // form complete with valid inputs -> enable submit
      setCardComplete(e.complete)
      // setError(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js not loaded yet. Disable form submission
      return
    }

    if (error) {
      elements.getElement("card").focus()
      return
    }

    if (cardComplete) {
      setCardProcessing(true)
    }

    // STEP 3: confirm payment with Stripe
    // with PaymentIntent clientSecret and CardElement
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        // https://stripe.com/docs/api/payment_methods/create#create_payment_method-billing_details
        billing_details: {
          address: {
            city: billingDetails.city,
            country: billingDetails.country,
            line1: billingDetails.address1,
            line2: billingDetails.address2,
            postal_code: billingDetails.postal,
            state: billingDetails.province,
          },
          email: billingDetails.email,
          name: `${billingDetails.firstname} ${billingDetails.lastname}`,
          phone: billingDetails.phone,
        },
      },
    })

    setCardProcessing(false)

    if (payload.error) {
      setError(`Payment failed: ${payload.error.message}`)
      console.error("[error]", payload.error)
    } else {
      // SUCCESS

      setError(null)
      setSucceeded(true)
      setSuccessData(payload.paymentIntent)

      console.log("[PaymentIntent]", payload.paymentIntent)

      onOrderSuccess({
        successData: payload.paymentIntent,
      })
    }
  }

  const reset = () => {
    setError(null)
    setSucceeded(false)
    setSuccessData(null)
    setCardProcessing(false)

    setBillingDetails(initialBillingDetails)
  }

  return (
    <form onSubmit={handleSubmit}>
      <CustomerFields changeInput={changeInput} />

      <section>
        <h2>Payment Info</h2>
        <CardElement options={config} onChange={changeCardDetails} />
      </section>

      <section>
        <button
          className="buttonPrimary"
          type="submit"
          disabled={!clientSecret || !stripe || cardProcessing}
        >
          {cardProcessing ? "Processing..." : "Complete order"}
        </button>
      </section>
    </form>
  )
}
