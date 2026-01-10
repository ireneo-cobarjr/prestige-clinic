<template>
  <dialog
    ref="dialog"
    class="booking-delete-modal px-4 py-5"
  >
    <div class="modal-content">
      <h3 class="primary mb-3">
        Confirm Delete
      </h3>
      <section class="modal-body py-3">
        <span>Are you sure to delete {{ count }} booking(s)?</span>
      </section>
      <footer class="modal-footer mt-5">
        <button
          class="bg-primary px-3 py-1"
          style="border-radius: 8px;"
          @click="close"
        >
          Cancel
        </button>
        <button
          class="px-3 py-1"
          style="border-radius: 8px; background-color: #e07298;"
          @click="confirm"
        >
          Confirm
        </button>
      </footer>
    </div>
  </dialog>
</template>

<script lang="ts" setup>
const dialogRef = useTemplateRef<HTMLDialogElement>('dialog');

const emit = defineEmits<{
  (e: 'confirm'): void
}>();

const count = ref(0);

const open = (countValue: number) => {
  count.value = countValue;
  dialogRef.value?.showModal();
};

const close = () => {
  dialogRef.value?.close();
};

const confirm = () => {
  emit('confirm');
  close();
};

defineExpose({
  open,
  close,
});
</script>

<style lang="scss" scoped>
.booking-delete-modal {
  width: 400px;

  .modal-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
}
</style>
