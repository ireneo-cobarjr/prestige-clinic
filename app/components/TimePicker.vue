<script setup>
const props = defineProps({
  unavailableTimes: {
    type: Array,
    required: true,
  },
});
const emits = defineEmits(['get-time']);

const inputStatus = inject(BookingDialogFormInputStatusSetter);

const time = ref('');

const filteredTimeOptions = computed(() => {
  return timePickerOptions.map((option) => {
    return {
      ...option,
      disabled: option.value === '' ? true : props.unavailableTimes.includes(option.value),
    };
  });
});

defineExpose({
  setTime: (selectedTime) => {
    time.value = selectedTime;
    if (time.value === '') {
      inputStatus('time', false);
    }
    else {
      inputStatus('time', true);
    }
  },
});

watch(time, (newTime) => {
  emits('get-time', newTime);
  inputStatus('time', !!newTime);
});
</script>

<template>
  <BaseSelect
    id="time"
    v-model="time"
    :options="filteredTimeOptions"
    label="Time"
  />
</template>
