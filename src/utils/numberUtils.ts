export const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp)
  const now = new Date()

  const isSameDay =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()

  const options: Intl.DateTimeFormatOptions = isSameDay
    ? { hour: 'numeric', minute: 'numeric', hour12: true }
    : {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }

  return date.toLocaleString('en-US', options)
}
