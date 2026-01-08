type TimeOption = { value: string, label: string, disabled: boolean };

/**
 * Returns an array of values from timeOptions that have already passed in Manila time.
 */
export function getExpiredManilaTimes(timeOptions: TimeOption[]): string[] {
  const now = new Date();

  // 1. Get current Manila Time
  // Use 'en-GB' or 'en-US' with hour12: false for consistent 24-hour format
  const manilaTimeStr = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Manila',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(now);

  // 2. Parse current time into total minutes
  const [currentHour = 0, currentMinute = 0] = manilaTimeStr.split(':').map(Number);
  const currentTotalMinutes = (currentHour * 60) + currentMinute;

  // 3. Compare against options
  return timeOptions
    .filter((option) => {
      // Ignore empty values or labels
      if (!option.value || !option.value.includes(':')) return false;

      // Parse option time (e.g., "08:30")
      const [optHour = 0, optMinute = 0] = option.value.split(':').map(Number);
      const optionTotalMinutes = (optHour * 60) + optMinute;

      // Logic: If the option time is in the past or is exactly now, mark as expired
      return optionTotalMinutes <= currentTotalMinutes;
    })
    .map(option => option.value);
}
