import { useState } from "react"
import QueueForm from "./components/QueueForm"
import QueueDisplay from "./components/QueueDisplay"
import type { NewQueueCustomer, QueueCustomer, QueueStatus } from "./types"
import "./App.css"

export default function App() {
  const [queue, setQueue] = useState<QueueCustomer[]>([])

  const addToQueue = (customer: NewQueueCustomer) => {
    setQueue((currentQueue) => [
      ...currentQueue,
      { ...customer, id: Date.now(), status: "Waiting" },
    ])
  }

  const updateStatus = (id: number, newStatus: QueueStatus) => {
    setQueue((currentQueue) =>
      currentQueue.map((customer) =>
        customer.id === id ? { ...customer, status: newStatus } : customer,
      ),
    )
  }

  const removeFromQueue = (id: number) => {
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