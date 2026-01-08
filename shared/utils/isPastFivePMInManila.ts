export default function (): boolean {
  const options = {
    timeZone: 'Asia/Manila',
    hour: 'numeric',
    hour12: false,
  } as const;

  const manilaHour = new Intl.DateTimeFormat('en-US', options).format(new Date());

  return parseInt(manilaHour, 10) >= 17;
}
