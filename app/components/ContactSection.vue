<template>
  <div class="px-4 py-5">
    <div id="contact-section">
      <div class="places">
        <Place
          place-name="Principe OB-GYN and Wellness Centre"
          phone="0916 479 3432"
          email="dociceprincipe@gmail.com"
          fb-name="Principe Ob-Gyn"
          fb-link="https://www.facebook.com/dociceprincipe"
        />

        <Place
          place-name="MeritCare Medical . Cardio . Ob-Gyn and Diagnostic Clinic"
          phone="0966 025 5868"
          email="meritcareclinic01@gmail.com"
          fb-name="MeritCare Medical"
          fb-link="https://www.facebook.com/people/MeritCare-Medical-Cardio-Ob-Gyn-and-Diagnostic-Clinic/61581556880297/"
        />
      </div>
      <div class="bg-primary px-4 py-5">
        <h5>Visit us at:</h5>
        <span>Room 321 Marian Medical Arts Building Dahlia St. Regalado Ave Fairview , Quezon City</span>
      </div>
      <GoogleMap map-src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.2298424442074!2d121.0641006759347!3d14.699590174643745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b0bd232ba4ed%3A0x314f4849c94e4f45!2sMarian%20Medical%20Arts%20Building%2C%20Dahlia%20Ave%2C%20Novaliches%2C%20Quezon%20City%2C%20Metro%20Manila%2C%20Philippines!5e0!3m2!1sen!2sus!4v1767527425536!5m2!1sen!2sus" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.places {
  display: flex;
}

#contact-section {
  background-color: white;
  border-radius: 8px;
  box-shadow:   0 1px 3px rgba(0, 0, 0, 0.12),
  0 8px 24px rgba(0, 0, 0, 0.18);
}

@media screen and (max-width: 1199px) {
  .places {
    flex-direction: column;

    .contact-info,
    .contact-map {
      width: 100%;
    }

    .place {
      width: 100%;
    }
  }
}
</style>
