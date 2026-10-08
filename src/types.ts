// Only these three strings are valid queue statuses.
export type QueueStatus = "Waiting" | "In Progress" | "Completed"

// The form provides these details before the app assigns an ID and status.
export interface NewQueueCustomer {
  name: string
  service: string
}

// A queue customer has the form details plus an ID and a current status.
export interface QueueCustomer extends NewQueueCustomer {
  id: number
  status: QueueStatus
}