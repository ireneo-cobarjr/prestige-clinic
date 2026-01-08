<script setup lang="ts">
withDefaults(
  defineProps<{
    message: string
    show?: boolean
  }>(),
  {
    show: false,
  },
);

const emits = defineEmits<{
  (e: 'close'): void
}>();
</script>

<template>
  <div
    id="toasts-container"
    :class="{ show: show }"
  >
    <div class="toast-message mb-4 error-message-toast px-4 py-3 font-secondary">
      <div class="message-type-indicator">
        <Icon
          name="mynaui:book-x-solid"
          size="2em"
        />
      </div>
      <div class="message-container">
        <strong>
          {{ message }}
        </strong>
        <button
          class="p-2"
          style="color: #c94471; background-color: white; border-radius: 8px;"
          @click="emits('close')"
        >
          <small>Close</small>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.error-message-toast {
  background-color: #c94471;
  color: white;
}

#toasts-container {
  position: absolute;
  transition: all 0.3s ease-in-out;
  bottom: -500px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  z-index: 99999;

  &.show {
    bottom: -1em !important;
  }

  .toast-message {
    width: 100%;
    display: flex;
    gap: 10px;

    .message-type-indicator {
      display: flex;
      align-items: center;
    }

    .message-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      gap: 30px;
    }
  }
}

@media screen and (max-width: 700px) {
  .message-container {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }

  .toast-message {
    flex-direction: column;
    align-items: center;
  }
}
</style>
