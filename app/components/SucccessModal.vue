<script lang="ts" setup>
const dialogRef = useTemplateRef<HTMLDialogElement>('dialogRef');

const date = ref('');
const time = ref('');

/**
 * Converts a YYYY-MM-DD string to "Month DD, YYYY (DayOfWeek)"
 * @param {string} dateString - Format: "YYYY-MM-DD"
 * @returns {string} - Format: "January 21, 2021 (Thursday)"
 */
function formatLocalDate(dateString: string) {
  // Split the string to avoid timezone shifts
  const [year, month, day] = dateString.split('-').map(Number);

  // Create a date object (Note: months are 0-indexed in JS, so subtract 1)
  const date = new Date((year as number), (month as number) - 1, day);

  // Use Intl.DateTimeFormat for high-quality localization
  const monthName = date.toLocaleString('en-US', { month: 'long' });
  const dayNum = String(day).padStart(2, '0');
  const weekday = date.toLocaleString('en-US', { weekday: 'long' });

  return `${monthName} ${dayNum}, ${year} - ${weekday}`;
}

const getFormattedTime = (time: string) => {
  return timePickerOptions.find(t => t.value === time)?.label || time;
};

const open = (bookingData: { date: string, time: string }) => {
  dialogRef.value?.showModal();
  console.log(bookingData);
  date.value = formatLocalDate(bookingData.date);
  time.value = getFormattedTime(bookingData.time);
};

const close = () => {
  dialogRef.value?.close();
};

defineExpose({
  open,
  close,
});
</script>

<template>
  <dialog ref="dialogRef">
    <div
      class="px-3 y-4"
      style="display: flex; flex-direction: column; align-items: center; justify-content: space-between; gap: 3rem; text-align: center;"
    >
      <div>
        <h1 class="primary mb-5">
          Thank you
        </h1>
        <p style="font-style: italic;">
          Your appointment has been <strong>successfully booked</strong>.
        </p>
        <p class="mt-2">
          We expect to see you on <strong class="primary">{{ date }}</strong> at <strong class="primary">{{ time }}</strong>.
        </p>
      </div>
      <div>
        <button
          class="bg-primary px-4 py-1"
          style="border-radius: 8px"
          @click="close"
        >
          Close
        </button>
      </div>
    </div>
  </dialog>
</template>
