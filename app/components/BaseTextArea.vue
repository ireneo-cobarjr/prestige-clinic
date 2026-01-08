<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  rule: {
    type: Array,
    required: false,
  },
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  label: { type: String, default: '' },
  rows: { type: Number, default: 4 },
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur']);

const inputStatus = inject(BookingDialogFormInputStatusSetter);

/* simple error handling */
const error = ref('');

const onModelValueChange = (textValue) => {
  emit('update:modelValue', textValue);

  if (props.rule) {
    for (const rule of props.rule) {
      const validationStatus = rule.validator(textValue);
      if (!validationStatus) {
        error.value = rule.message;
        if (rule.forField) {
          inputStatus(rule.forField, false);
        }
        return;
      }
      else {
        if (rule.forField) {
          inputStatus(rule.forField, validationStatus);
        }
        error.value = '';
      }
    }
  }
};
</script>

<template>
  <div class="base-textarea">
    <label
      v-if="label"
      :for="id"
      class="base-textarea__label"
    >
      {{ label }}
    </label>

    <textarea
      :id="id"
      :rows="rows"
      :placeholder="placeholder"
      :value="modelValue"
      class="base-textarea__field"
      :class="{ 'has-error': error }"
      @input="onModelValueChange($event.target.value)"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
    />

    <div style="height: 20px;">
      <p
        v-if="error"
        class="base-textarea__error"
      >
        {{ error }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.base-textarea {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
}

.base-textarea__label {
  font-weight: 500;
  font-size: 0.875rem;
  color: #333;
}

.base-textarea__field {
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.base-textarea__field:focus {
  border-color: black;
  box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
  outline: none;
}

/* error state */
.base-textarea__field.has-error {
  border-color: #dc2626;
}

.base-textarea__error {
  font-size: 0.75rem;
  color: #dc2626;
  margin-top: 0.125rem;
}
</style>
