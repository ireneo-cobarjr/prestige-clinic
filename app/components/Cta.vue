<script setup lang="ts">
const router = useRouter();
</script>

<template>
  <div class="cta px-4 py-5">
    <div id="cta-image" />
    <div
      id="cta-info"
      class="py-4 mr-5"
    >
      <h1 class="primary">
        Principe OB-GYN
      </h1>
      <h3 class="primary mb-4">
        & MeritCare Medical
      </h3>
      <p
        class="font-secondary"
        style="font-size: 1.2em; font-weight: bold;"
      >
        <span>Your health and wellness are our top priorities</span>
      </p>
      <button
        class="bg-primary px-4 py-2 mt-4 button width-full"
        style="font-size: 1.5em;"
        @click="router.push('/book-appointment')"
      >
        Book an Appointment
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cta {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;

  #cta-image {
    max-width: 800px;
    flex-grow: 1;
    height: 33rem;
    background-image: url('../assets/images/principe-upscaled.png');
    background-size: contain;
    background-position: center;
    border-radius: 8px;
    background-repeat: no-repeat;
  }
}

#cta-wrapper {
  overflow: hidden;
  z-index: 1;
  position: relative;
}

@keyframes slide {
  from {
    right: -25vw;
  }
  to {
    right: 125vw;
  }
}

.h {
  box-shadow: 0 0 50vh 40vh white;
  width: 100vw;
  height: 0;
  bottom: 0;
  left: 0;
  position: absolute;
}
.v {
  box-shadow: 0 0 35vw 25vw white;
  width: 0;
  height: 100vh;
  bottom: 0;
  left: 0;
  position: absolute;
}

@media screen and (max-width: 1036px) {
  #open-time {
    display: block;
  }
}

@media screen and (max-width: 1112px) {
  .cta {
    flex-direction: column;
  }

  #cta-image {
    width: 100% !important;
    min-width: 100% !important;
  }

  #cta-info {
    text-align: center;
    margin-right: 0px !important;

    p {
      width: 100% !important;
    }
  }
}

@media screen and (max-width: 600px) {
  #cta-image {
    flex: 1 1 300px !important;
  }
}
</style>
