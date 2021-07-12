import Field from "./field"

export default function CustomerFields({ changeInput }) {
  return (
    <>
      <section>
        <h2>Contact info</h2>
        {/* TODO: hide if login required for checkout and if logged in */}
        <div className="group">
          <Field
            id="email"
            type="email"
            label="Email"
            required
            onChange={changeInput}
          />
          <Field
            id="phone"
            type="tel"
            label="Phone"
            required
            onChange={changeInput}
          />
        </div>

        <div className="group">
          <Field
            id="firstname"
            label="First Name"
            required
            onChange={changeInput}
          />
          <Field
            id="lastname"
            label="Last Name"
            required
            onChange={changeInput}
          />
        </div>
      </section>

      <section>
        <h2>Billing/Shipping Address</h2>

        <div className="group">
          <Field
            id="address1"
            label="Street Address"
            required
            onChange={changeInput}
          />
          <Field
            id="address2"
            label="Apt/building/suite"
            required
            onChange={changeInput}
          />
        </div>

        <div className="group">
          <Field id="city" label="City" required onChange={changeInput} />
          <Field id="postal" label="Postal" required onChange={changeInput} />
        </div>

        <div className="group">
          <Field
            id="province"
            label="Province"
            required
            onChange={changeInput}
          />
          <Field id="country" label="Country" required onChange={changeInput} />
        </div>
      </section>
    </>
  )
}
