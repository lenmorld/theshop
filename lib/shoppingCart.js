const createPaymentIntent = async (options) => {
  const raw = await fetch("/api/stripe-create-payment-intent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  })

  const data = await raw.json()

  if (!data || data.error) {
    console.error("Stripe API error:", { data })
    throw new Error("Stripe PaymentIntent API Error")
  } else {
    return data.client_secret
  }
}

const getCartDetails = async (options) => {
  const raw = await fetch("/api/cart-details", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  const data = await raw.json()

  if (!data || data.error) {
    console.error("API error:", { data })
    throw new Error("backend error on serverless")
  } else {
    return data
  }
}

const api = {
  createPaymentIntent,
  getCartDetails,
}

export default api
