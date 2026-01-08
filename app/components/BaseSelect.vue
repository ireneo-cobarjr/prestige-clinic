<template>
  <div class="base-select">
    <label
      v-if="label"
      :for="id"
      class="base-select__label"
    >{{ label }}</label>
    <select
      :id="id"
      :value="modelValue"
      class="base-select__field"
      @input="emit('update:modelValue', $event.target.value)"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
    >
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
        :disabled="option.disabled || false"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
defineProps({
  modelValue: [String, Number],
  options: { type: Array, default: () => [] }, // [{ label: 'Option 1', value: '1', disabled: true }]
  label: { type: String, default: '' },
  id: { type: String, default: () => `select-${Math.random().toString(36).substr(2, 9)}` },
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur'])
</script>

<style scoped>
.base-select {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.base-select__label {
  font-weight: 500;
  font-size: 0.875rem;
  color: #333;
}

.base-select__field {
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  font-size: 1rem;
  background-color: #fff;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg fill='none' stroke='%23666' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.base-select__field:focus {
  border-color: black;
  box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
  outline: none;
}
</style>
