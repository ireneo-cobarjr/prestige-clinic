<script setup lang="ts">
const bookingModal = useTemplateRef('bookingModal');
const successModal = useTemplateRef('successModal');

const openBookingModal = () => {
  if (bookingModal.value) {
    bookingModal.value.open();
  }
}

const openSuccessModal = (bookingData: { date: string, time: string }) => {
  if (successModal.value) {
    successModal.value.open(bookingData);
  }
}
</script>

<template>
  <div>
    <Cta
      class="mb-5"
      @book-appointment="openBookingModal"
    />
    <IntegritySection class="my-5" />
    <ServiceSection
      class="my-5"
      @book-appointment="openBookingModal"
    />
    <ContactSection />
    <BookVisitModal
      ref="bookingModal"
      @booked="openSuccessModal"
    />
    <SucccessModal ref="successModal" />
  </div>
</template>
