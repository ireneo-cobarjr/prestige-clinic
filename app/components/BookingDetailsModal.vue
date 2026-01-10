<template>
  <dialog
    ref="dialog"
    class="px-4 py-5"
  >
    <div class="mb-5">
      <h1 class="primary">
        Booking Details
      </h1>
      <pre style="font-size: 0.8em;">{{ `Booked on ${bookingDetails?.createdAt}` }}</pre>
    </div>
    <div
      class="mt-5"
      style="display: flex; flex-direction: column; justify-content: space-between;"
    >
      <div>
        <div class="details-line">
          <strong>Booking ID:</strong>
          <span class="ml-5 font-secondary">{{ bookingDetails?.id }}</span>
        </div>
        <div class="details-line">
          <strong>Service booked:</strong>
          <span class="ml-5 font-secondary">{{ bookingDetails?.service }}</span>
        </div>
        <div class="details-line">
          <strong>Date:</strong>
          <span class="ml-5 font-secondary">{{ bookingDetails?.date }}</span>
        </div>
        <div class="details-line">
          <strong>Time:</strong>
          <span class="ml-5 font-secondary">{{ bookingDetails?.time }}</span>
        </div>
        <div class="details-line">
          <strong>Patient:</strong>
          <span class="ml-5 font-secondary">{{ `${bookingDetails?.firstName} ${bookingDetails?.middleName} ${bookingDetails?.lastName}` }}</span>
        </div>
        <div class="details-line">
          <strong>Email:</strong>
          <span class="ml-5 font-secondary">{{ bookingDetails?.email }}</span>
        </div>
        <div class="details-line">
          <strong>Phone number:</strong>
          <span class="ml-5 font-secondary">{{ bookingDetails?.phoneNumber }}</span>
        </div>
        <div class="details-line">
          <strong>Address:</strong>
          <div>
            <div class="ml-5 font-secondary">
              {{ bookingDetails?.addressLine1 }}
            </div>
            <div class="ml-5 font-secondary">
              {{ bookingDetails?.addressLine2 }}
            </div>
          </div>
        </div>
        <div>
          <strong class="mb-3">Additional notes:</strong>
          <p style="font-style: italic;">
            {{ bookingDetails?.info }}
          </p>
        </div>
      </div>
      <div style="text-align: center; margin-top: 120px;">
        <button
          class="bg-primary px-5 py-1"
          style="border-radius: 8px;"
          @click="close"
        >
          Close
        </button>
      </div>
    </div>
  </dialog>
</template>

<script lang="ts" setup>
const dialogRef = useTemplateRef<HTMLDialogElement>('dialog');
const bookingDetails = ref(null);

const open = (booking) => {
  bookingDetails.value = booking;
  console.log(bookingDetails.value)
  dialogRef.value?.showModal();
};

const close = () => {
  dialogRef.value?.close();
};

defineExpose({
  open,
  close,
});
</script>

<style scoped>
dialog {
  width: 90%;
  max-width: 600px;

  .details-line {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
}
</style>
