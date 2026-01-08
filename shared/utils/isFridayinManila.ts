export default function (): boolean {
  const options = {
    timeZone: 'Asia/Manila',
    weekday: 'long',
  } as const;

  const formatter = new Intl.DateTimeFormat('en-US', options);
  const currentDay = formatter.format(new Date());

  return currentDay === 'Friday';
}
