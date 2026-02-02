<script setup lang="ts">
useSeoMeta({
  title: 'Principe & Merit',
  ogTitle: 'Principe & Merit',
  description: 'Your health and wellness are our top priorities',
  ogDescription: 'Your health and wellness are our top priorities',
  ogImage: 'https://principeandmerit.vercel.app/image.png',
  keywords: 'principeandmerit, clinic, ob, ob-gyn, ob gyn, cardio, weight loss, weight-loss',
});

const bookingModal = useTemplateRef('bookingModal');

const openBookingModal = () => {
  if (bookingModal.value) {
    bookingModal.value.open();
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
    <WeightLossSection class="my-5" />
    <Schedules />
    <ServiceSection
      class="my-5"
      @book-appointment="openBookingModal"
    />
    <ContactSection />
    <BookVisitModal
      ref="bookingModal"
    />
  </div>
</template>
