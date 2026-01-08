<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  id: { type: String, required: true },
  modelValue: { type: String, default: '' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  items: { type: Array, required: true }, // [{ name: string, items: string[] }]
})

const emit = defineEmits(['update:modelValue']);
const error = ref('');

const inputStatus = inject(BookingDialogFormInputStatusSetter);

const flatItems = computed(() => {
  return props.items.reduce((acc, cat) => {
    const i = cat.items.map(item => item.toUpperCase());
    return acc.concat(i);
  }, []);
});

const rootRef = ref(null)
const inputRef = ref(null)
const isOpen = ref(false)
const query = ref('')
const selected = ref('')

/* ----------------------------
 * Filtered categories
 * ---------------------------- */
const filteredCategories = computed(() => {
  if (!query.value) return props.items
  return props.items
    .map(cat => ({
      name: cat.name,
      items: cat.items.filter(i =>
        i.toLowerCase().includes(query.value.toLowerCase()),
      ),
    }))
    .filter(cat => cat.items.length)
})

/* ----------------------------
 * Open / close dropdown
 * ---------------------------- */
function open() {
  isOpen.value = true
}

function close() {
  isOpen.value = false
  // reset default state if empty
  if (!selected.value && !query.value) {
    emit('update:modelValue', '')
  }

  inputRef.value.blur();
}

/* ----------------------------
 * Input handlers
 * ---------------------------- */
function onInput(e) {
  if (!isOpen.value) open()
  query.value = e.target.value
  selected.value = ''
  emit('update:modelValue', '')
}

function onKeydown(e) {
  if (e.key === 'Escape') {
    close()
  }
}

/* ----------------------------
 * Item selection
 * ---------------------------- */
function selectItem(item) {
  selected.value = item
  query.value = item
  emit('update:modelValue', item)
  close()
}

/* ----------------------------
 * Click outside
 * ---------------------------- */
function handleClickOutside(e) {
  if (rootRef.value && !rootRef.value.contains(e.target)) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})

/* ----------------------------
 * Sync external modelValue
 * ---------------------------- */
watch(
  () => props.modelValue,
  (val) => {
    selected.value = val || ''
    query.value = val || ''
  },
  { immediate: true },
)

watch(query, (newVal) => {
  const valid = flatItems.value.includes(newVal.toUpperCase());
  if (!valid) {
    error.value = 'Please select a valid Service.';
    inputStatus('service', false);
  }
  else {
    error.value = '';
    inputStatus('service', true);
  }
})
</script>

<template>
  <div
    ref="rootRef"
    class="base-select"
  >
    <label
      v-if="label"
      :for="id"
      class="base-select__label"
    >{{ label }}</label>

    <div class="base-select__wrapper">
      <input
        :id="id"
        ref="inputRef"
        class="base-select__field"
        :class="{ 'has-error': error }"
        :placeholder="placeholder"
        :value="query"
        @focus="open"
        @input="onInput"
        @keydown="onKeydown"
      >

      <div
        v-if="isOpen"
        class="base-select__dropdown"
      >
        <template v-if="filteredCategories.length">
          <div
            v-for="cat in filteredCategories"
            :key="cat.name"
            class="base-select__category mb-4"
          >
            <div class="base-select__category-name bg-primary">
              {{ cat.name }}
            </div>

            <div
              v-for="item in cat.items"
              :key="item"
              class="base-select__option"
              @mousedown.prevent="selectItem(item)"
            >
              {{ item }}
            </div>
          </div>
        </template>

        <div
          v-else
          class="base-select__empty"
        >
          No results
        </div>
      </div>
    </div>

    <p
      v-if="error"
      class="base-select__error"
    >
      {{ error }}
    </p>
  </div>
</template>

<style scoped>
.base-select {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
}

.base-select__label {
  font-weight: 500;
  font-size: 0.875rem;
  color: #333;
}

.base-select__wrapper {
  position: relative;
}

.base-select__field {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  font-size: 1rem;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.base-select__field:focus {
  border-color: black;
  box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
  outline: none;
}

.base-select__field.has-error {
  border-color: #dc2626;
}

.base-select__dropdown {
  position: absolute;
  z-index: 20;
  width: 100%;
  margin-top: 0.25rem;
  background: white;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  max-height: 14rem;
  overflow-y: auto;
}

.base-select__category {
  padding: 0.25rem 0;
}

.base-select__category-name {
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  text-transform: uppercase;
}

.base-select__option {
  padding: 0.5rem 0.75rem;
  cursor: pointer;
}

.base-select__option:hover {
  background: #f3f4f6;
}

.base-select__empty {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: #666;
}

.base-select__error {
  font-size: 0.75rem;
  color: #dc2626;
  margin-top: 0.125rem;
}
</style>
