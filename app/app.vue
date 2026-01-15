<script setup lang="ts">
const successModal = useTemplateRef('successModal');
const nuxtApp = useNuxtApp();

const openSuccessModal = (bookingData: { date: string, time: string }) => {
  if (successModal.value) {
    successModal.value.open(bookingData);
  }
}

nuxtApp.hook('booked', openSuccessModal);
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <SucccessModal ref="successModal" />
  </NuxtLayout>
</template>
