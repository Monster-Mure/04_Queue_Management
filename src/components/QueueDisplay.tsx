import type { QueueCustomer, QueueStatus } from "../types"
import { FaCheck, FaPlay, FaTrashAlt } from "react-icons/fa"

type QueueDisplayProps = {
    queue: QueueCustomer[]
    onUpdateStatus: (id: number, status: QueueStatus) => void
    onRemove: (id: number) => void
}

const statusClassNames: Record<QueueStatus, string> = {
    Waiting: "waiting",
    "In Progress": "in-progress",
    Completed: "completed",
}

export default function QueueDisplay({
    queue,
    onUpdateStatus,
    onRemove,
}: QueueDisplayProps) {
    const renderNextStepButton = (customer: QueueCustomer) => {
        if (customer.status === "Waiting") {
            return (
                <button
                    className="queue-list__action queue-list__action--primary"
                    type="button"
                    onClick={() => onUpdateStatus(customer.id, "In Progress")}
                >
                    <FaPlay aria-hidden="true" />
                    Start service
                </button>
            )
        }

        if (customer.status === "In Progress") {
            return (
                <button
                    className="queue-list__action queue-list__action--primary"
                    type="button"
                    onClick={() => onUpdateStatus(customer.id, "Completed")}
                >
                    <FaCheck aria-hidden="true" />
                    Mark completed
                </button>
            )
        }

        return null
    }

    return (
        <section className="queue-list" aria-labelledby="queue-list-title">
            <div className="queue-list__heading">
                <div>
                    <p className="queue-list__eyebrow">Live operations</p>
                    <h2 className="queue-list__title" id="queue-list-title">
                        Current queue
                    </h2>
                </div>
                <span className="queue-list__count" aria-label={`${queue.length} customers`}>
                    {queue.length}
                </span>
            </div>

            {queue.length === 0 ? (
                <div className="queue-list__empty">
                    <p className="queue-list__empty-title">Your queue is empty</p>
                    <p>Add a customer with the form to get started.</p>
                </div>
            ) : (
                <ul className="queue-list__items">
                    {queue.map((customer, index) => (
                        <li className="queue-list__item" key={customer.id}>
                            <span className="queue-list__index" aria-hidden="true">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <div className="queue-list__customer">
                                <div className="queue-list__customer-heading">
                                    <h3 className="queue-list__name">{customer.name}</h3>
                                    <span
                                        className={`queue-list__status queue-list__status--${statusClassNames[customer.status]}`}
                                        aria-live="polite"
                                    >
                                        {customer.status}
                                    </span>
                                </div>
                                <p className="queue-list__service">
                                    <span>Service</span>
                                    {customer.service}
                                </p>
                            </div>

                            <div className="queue-list__actions">
                                {renderNextStepButton(customer)}
                                <button
                                    className="queue-list__action queue-list__action--remove"
                                    type="button"
                                    onClick={() => onRemove(customer.id)}
                                >
                                    <FaTrashAlt aria-hidden="true" />
                                    Remove
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}