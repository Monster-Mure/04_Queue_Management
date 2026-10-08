import { useState } from "react"
import type { FormEvent } from "react"
import { FaUserPlus } from "react-icons/fa"
import type { NewQueueCustomer } from "../types"

type QueueFormProps = {
  onAdd: (customer: NewQueueCustomer) => void
}

export default function QueueForm({ onAdd }: QueueFormProps) {
  // These values are kept in React state so the inputs update as the user types.
  const [name, setName] = useState("")
  const [service, setService] = useState("")

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // Stop the browser from reloading the page when the form is submitted.
    event.preventDefault()
    if (!name.trim() || !service.trim()) return

    // Send the form details to App, then clear the form for the next customer.
    onAdd({ name: name.trim(), service })
    setName("")
    setService("")
  }

  return (
    <form className="queue-form" onSubmit={handleSubmit}>
      <h2 className="queue-form__title">Add a customer</h2>
      <div className="queue-form__field">
        <label htmlFor="name">Customer name</label>
        <input
          type="text"
          id="name"
          placeholder="e.g. Alex Morgan"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="queue-form__field">
        <label htmlFor="service">Service</label>
        <select
          id="service"
          value={service}
          onChange={(event) => setService(event.target.value)}
        >
          <option value="">Select a service</option>
          <option value="Consultation">Consultation</option>
          <option value="Payment">Payment</option>
          <option value="Support">Support</option>
        </select>
      </div>
      <button className="queue-form__submit" type="submit">
        <FaUserPlus aria-hidden="true" /> Add customer
      </button>
    </form>
  )
}
 