/**
 * Returns the start (Monday) and end (Sunday) of the current week
 * based on Philippine Time (Asia/Manila).
 */
export default function (): {
  startOfWeek: string
  endOfWeek: string
} {
  // Get current date in Philippine Time
  const nowPHT = new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' }),
  )

  // JS: Sunday = 0, Monday = 1, ..., Saturday = 6
  const dayOfWeek = nowPHT.getDay()

  // Convert to Monday-based index (Monday = 0, Sunday = 6)
  const mondayBasedIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1

  const start = new Date(nowPHT)
  start.setDate(nowPHT.getDate() - mondayBasedIndex)

  const end = new Date(start)
  end.setDate(start.getDate() + 6)

  return {
    startOfWeek: formatDatePHT(start),
    endOfWeek: formatDatePHT(end),
  }
}

/**
 * Formats a Date to YYYY-MM-DD using PHT
 */
function formatDatePHT(date: Date): string {
  const phtDate = new Date(
    date.toLocaleString('en-US', { timeZone: 'Asia/Manila' }),
  )

  const year = phtDate.getFullYear()
  const month = String(phtDate.getMonth() + 1).padStart(2, '0')
  const day = String(phtDate.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}
