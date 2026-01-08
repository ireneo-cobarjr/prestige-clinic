export function getComingMondayInManila(): Date {
  const now = new Date();

  // 1. Get current day name in Manila
  const manilaDayName = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Manila',
    weekday: 'short',
  } as const).format(now);

  // 2. Map the short names to numeric values
  const dayMap: Record<string, number> = {
    Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
  };

  // 3. Use nullish coalescing (??) to provide a fallback
  // and ensure currentDay is always a number.
  const currentDay = dayMap[manilaDayName] ?? 0;

  /**
   * 4. Calculate days until coming Monday
   * (Target Day 1 - Current Day + 7) % 7
   * If the result is 0 (it is Monday), we use 7 to get the NEXT Monday.
   */
  const daysToMonday = (1 - currentDay + 7) % 7 || 7;

  const comingMonday = new Date(now);
  comingMonday.setDate(now.getDate() + daysToMonday);

  // Set to start of day (Midnight)
  comingMonday.setHours(0, 0, 0, 0);

  return comingMonday;
}
