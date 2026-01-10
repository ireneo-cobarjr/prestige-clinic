/**
 * Check if a booking date and time has already passed in Philippine time (UTC+8)
 * @param dateStr - Date string in 'YYYY-MM-DD' format
 * @param timeStr - Time string in 'HH:mm' format (24-hour)
 * @returns true if the date/time is in the past, false otherwise
 */
export default function (dateStr: string, timeStr: string): boolean {
  // 1️⃣ Parse date and time into a JS Date object in Philippine time
  const [year, month, day] = dateStr.split('-').map(Number)
  const [hour, minute] = timeStr.split(':').map(Number)

  // Create a Date object in UTC
  const bookingUTC = new Date(Date.UTC(year, month - 1, day, hour - 8, minute, 0))

  // 2️⃣ Get current Philippine time
  const nowPH = new Date()
  const nowUTC = new Date(nowPH.getTime() + nowPH.getTimezoneOffset() * 60_000) // UTC
  const nowInPH = new Date(nowUTC.getTime() + 8 * 60 * 60_000) // UTC+8

  // 3️⃣ Compare booking time with now
  return bookingUTC.getTime() < nowInPH.getTime()
}
