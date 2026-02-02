<script setup>
import { VueDatePicker, WeekStart } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const emits = defineEmits(['get-date']);

const inputStatus = inject(BookingDialogFormInputStatusSetter);

const maxDate = computed(() => {
  const d = new Date();
  d.setMonth(d.getMonth() + 3);
  return d;
});

const filters = ref({
  weekDays: [0],
});

const date = ref();

const minSelectableDate = computed(() => {
  if (isFridayinManila() && isPastFivePMInManila()) {
    return getComingMondayInManila()
  }

  if (isPastFivePMInManila() && !isFridayinManila()) {
    return getManilaTomorrow();
  }
  return new Date();
});

watch(date, (newDate) => {
  emits('get-date', newDate);
  inputStatus('date', !!newDate);
});

defineExpose({
  reset: () => {
    date.value = undefined;
  },
});
</script>

<template>
  <clientOnly>
    <VueDatePicker
      v-model="date"
      :inline="{ input: true }"
      model-type="yyyy-MM-dd"
      auto-apply
      :min-date="minSelectableDate"
      :max-date="maxDate"
      prevent-min-max-navigation
      :filters="filters"
      :time-config="{ enableTimePicker: false }"
      :week-start="WeekStart.Sunday"
      :formats="{ weekDay: 'EEEEE', input: 'MMM dd, yyyy - eee' }"
      :ui="{ input: 'form-input' }"
    />
  </clientOnly>
</template>

<style scoped>
.form-input {
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid black !important;
  border-radius: 4px;
  font-size: 1rem;
}
</style>
