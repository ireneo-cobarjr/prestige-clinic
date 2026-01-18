<script lang="ts" setup>
const { width } = useWindowSize();

const itemsToShow = computed(() => {
  if (width.value < 700) return 1;
  if (width.value < 1260) return 3.5;
  if (width.value <= 1360) return 4.1;
  if (width.value <= 1490) return 4.5;
  if (width.value <= 1520) return 5.2;
  return 6;
});
</script>

<template>
  <div class="px-4 py-5">
    <div
      class="py-5"
      style="background: white; border-radius: 8px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),0 8px 24px rgba(0, 0, 0, 0.18);"
    >
      <h2 class="text-center primary mb-5 mt-3">
        Weight Loss Program
      </h2>
      <p
        class="text-center"
        style="font-style: italic;"
      >
        Enjoy a guaranteed weight loss <br> with our expert guidance and support.
      </p>
      <clientOnly>
        <Carousel
          :autoplay="2500"
          :gap="10"
          :wrap-around="true"
          :items-to-show="itemsToShow"
        >
          <Slide
            v-for="slide in 12"
            :key="slide"
          >
            <div :style="['width: 300px; height: 700px;', `background-image: url(/images/testimonial-wl-${slide}.jpeg); background-position: center; background-size: contain; background-repeat: no-repeat`]" />
          </Slide>
        </Carousel>
      </clientOnly>
      <div
        class="px-4 pb-5"
        style="text-align: center;"
      >
        <hr
          class="mb-5 mt-3"
          style="border: 1px solid #d1d1d1;"
        >
        <h4 class="primary mb-3">
          About our Program
        </h4>
        <p class="mb-4">
          This dual-action medications which has several types according to our patients need po that acts effectively on weigltloss/ fat loss, without muscle wasting.
          It has an Imported Formula, Dual Action for Better Results!
          Unlike older meds that act on just one receptor, our advanced treatment works on two, giving you more effective weight-loss results. MONEY BACK GUARANTEE.
        </p>
        <p class="mb-4">
          Many of our patients feel more in control of their appetite, more motivated, and encouraged as they see consistent progress under medical supervision.
        </p>
        <p class="mb-4">
          Its not Like the other weight loss medication wherein most if not all patients experience insomia, palpitation, headache, severe vomiting etc.
        </p>
        <p class="mb-4">
          Each injection is priced at ₱2,800. Many of our clients choose to avail the vial, as it offers a more practical and convenient option overall.
        </p>
        <p class="mb-4">
          Be cautious of unverified online products—many lack proper safety certification.
          Consult your doctor to learn if this treatment is right for you.
          Because your health and safety come first.
        </p>
      </div>
    </div>
  </div>
</template>
