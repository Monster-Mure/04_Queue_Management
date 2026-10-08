import { useState } from "react"
import QueueForm from "./components/QueueForm"
import QueueDisplay from "./components/QueueDisplay"
import type { NewQueueCustomer, QueueCustomer, QueueStatus } from "./types"
import "./App.css"

export default function App() {
  // The queue is an array of customers, and starts empty.
  const [queue, setQueue] = useState<QueueCustomer[]>([])

  const addToQueue = (customer: NewQueueCustomer) => {
    // React state is replaced with a new array instead of being changed in place.
    // The spread copies the existing customers; the new customer is added at the end.
    setQueue((currentQueue) => [
      ...currentQueue,
      { ...customer, id: Date.now(), status: "Waiting" },
    ])
  }

  const updateStatus = (id: number, newStatus: QueueStatus) => {
    // map creates a new array and changes only the customer with the matching ID.
    setQueue((currentQueue) =>
      currentQueue.map((customer) =>
        customer.id === id ? { ...customer, status: newStatus } : customer,
      ),
    )
  }

  const removeFromQueue = (id: number) => {
    // filter creates a new array without the customer being removed.
    setQueue((currentQueue) =>
      currentQueue.filter((customer) => customer.id !== id),
    )
  }
  return (
    <div className="app-shell">
      <header className="app-header">
        <p className="app-eyebrow">Service desk</p>
        <h1 className="app-title">Queue management</h1>
        <p className="app-description">
          Keep customer requests organized and make the next step clear.
        </p>
      </header>
      <main className="queue-layout">
        <QueueForm onAdd={addToQueue} />
        <QueueDisplay
          queue={queue}
          onUpdateStatus={updateStatus}
          onRemove={removeFromQueue}
        />
      </main>
    </div>
  )
}