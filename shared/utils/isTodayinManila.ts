export default function (dateString: string | Date): boolean {
  // Use "as const" to satisfy TypeScript's strict literal requirements
  const options = {
    timeZone: 'Asia/Manila',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  } as const;

  const formatter = new Intl.DateTimeFormat('en-CA', options);

  // Get Manila "Today" string (e.g., "2026-01-08")
  const manilaToday = formatter.format(new Date());

  // Convert the input date to Manila string
  const targetDate = formatter.format(new Date(dateString));

  return manilaToday === targetDate;
}
