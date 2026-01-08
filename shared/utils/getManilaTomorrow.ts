export function getManilaTomorrow(): Date {
  // 1. Get current time in Manila
  const manilaString = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Manila',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(new Date());

  // 2. Create a date object based on that Manila string
  const tomorrow = new Date(manilaString);

  // 3. Add one day
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  return tomorrow;
}
