<script lang="ts" setup>
const emits = defineEmits<{
  (e: 'booked', a: { date: string, time: string }): void
}>();

const dialogRef = useTemplateRef<HTMLDialogElement>('dialog');
const datePickerRef = useTemplateRef('datePickerRef');
const timePicker = useTemplateRef('timePicker');

const bookingInitialState = {
  service: '',
  date: '',
  time: '',
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  addressLine1: '',
  addressLine2: '',
  info: '',
};

const unavailableTimes = ref<string[]>([]);
const booking = ref({ ...bookingInitialState });

const inputStatus = ref<Record<string, boolean>>({
  service: false,
  date: false,
  time: false,
  firstName: false,
  middleName: false,
  lastName: false,
  email: false,
  phoneNumber: false,
  addressLine1: false,
  addressLine2: true,
  info: true,
});

const canBeBooked = computed(() => {
  return (
    inputStatus.value.service
    && inputStatus.value.date
    && inputStatus.value.time
    && inputStatus.value.firstName
    && inputStatus.value.lastName
    && inputStatus.value.email
    && inputStatus.value.phoneNumber
    && inputStatus.value.addressLine1
    && inputStatus.value.addressLine2
    && inputStatus.value.info
  );
});

const loading = ref(false);

const setInputStatus = (field: string, status: boolean) => {
  inputStatus.value[field] = status;
};

provide(
  BookingDialogFormInputStatusSetter,
  setInputStatus,
);

const open = () => {
  dialogRef.value?.showModal();
};

const close = () => {
  dialogRef.value?.close();
};

const reset = () => {
  booking.value = { ...bookingInitialState };
  unavailableTimes.value = [];
  loading.value = false;
  showConflictMessage.value = false;
  datePickerRef.value?.reset();
  timePicker.value?.setTime('');
};

const getUnavailableTimes = async (dateString: string) => {
  unavailableTimes.value = await $fetch('/api/bookings/check', {
    query: { date: booking.value.date },
  });
};

const setDate = async (date: string) => {
  if (date) {
    booking.value.date = date;
    timePicker.value?.setTime('');
    await getUnavailableTimes(booking.value.date);
    if (isTodayinManila(date)) {
      const expiredTimes = getExpiredManilaTimes(timePickerOptions);
      unavailableTimes.value = [...unavailableTimes.value, ...expiredTimes];
    }
  }
};

const servicesList = getServicesMenu();

defineExpose({
  open,
  close,
});

const conflictMessage = computed(() => `The appointment schedule you selected is already booked. Please choose another schedule.`);
const showConflictMessage = ref(false);

const submitBooking = async () => {
  try {
    loading.value = true;
    const response = await $fetch('/api/bookings', {
      method: 'POST',
      body: booking.value,
    })
    emits('booked', { date: booking.value.date, time: booking.value.time });
    reset();
    close();
  }
  catch (err: unknown) {
    if (err.statusCode === 409) {
      await getUnavailableTimes(booking.value.date);
      showConflictMessage.value = true;
      booking.value.time = '';
      timePicker.value?.setTime('');
    }
    else
      console.error('Booking failed.', err);
  }
  finally {
    loading.value = false;
  }
}
</script>

<template>
  <dialog
    id="booking-dialog"
    ref="dialog"
    :class="{ loading: loading }"
  >
    <div id="dialog-inner">
      <div
        id="dialog-close-btn"
      >
        <Icon
          name="line-md:menu-to-close-alt-transition"
          size="2em"
          style="color: white; transform: rotate(45deg); cursor: pointer;"
          @click="close"
        />
      </div>
      <div
        id="dialog-title"
        class="px-4 py-2"
      >
        <h1 class="primary">
          Book an Appointment
        </h1>
        <div
          id="booking-form"
          class="mt-4"
        >
          <div id="date-line">
            <div class="mb-3">
              <BaseSelectInput
                id="service"
                v-model="booking.service"
                label="Service"
                placeholder="Select a service"
                :items="servicesList"
              />
            </div>
            <div class="mb-4">
              <label style="font-size: 0.875rem; color: #333;">
                Date
              </label>
              <DatePicker
                ref="datePickerRef"
                @get-date="setDate"
              />
            </div>
            <div>
              <TimePicker
                ref="timePicker"
                :unavailable-times="unavailableTimes"
                @get-time="booking.time = $event"
              />
            </div>
          </div>

          <div class="personal-info">
            <div class="form-line mb-2">
              <BaseInput
                id="first_name"
                v-model.trim="booking.firstName"
                label="First Name"
                :rule="[{ forField: 'firstName', validator: isValidName, message: 'Please enter a valid first name.' }]"
              />
              <BaseInput
                id="middle_name"
                v-model.trim="booking.middleName"
                label="Middle Name"
                :rule="[{ forField: 'middleName', validator: isValidName, message: 'Please enter a valid middle name.' }]"
              />
              <BaseInput
                id="last_name"
                v-model.trim="booking.lastName"
                label="Last Name"
                :rule="[{ forField: 'lastName', validator: isValidName, message: 'Please enter a valid last name.' }]"
              />
            </div>
            <div class="form-line mb-2">
              <BaseInput
                id="email"
                v-model.trim="booking.email"
                label="Email"
                :rule="[{ forField: 'email', validator: isValidEmail, message: 'Please enter a valid email address.' }]"
              />
              <BaseInput
                id="phone_number"
                v-model.trim="booking.phoneNumber"
                label="Phone Number (Include area code for land lines)"
                :rule="[{ forField: 'phoneNumber', validator: validatePHPhone, message: 'Please enter a valid Phone number.' }]"
              />
            </div>
            <div class="form-line mb-2">
              <BaseInput
                id="address_1"
                v-model.trim="booking.addressLine1"
                label="Address Line 1"
                :rule="[{ forField: 'addressLine1', validator: isValidAddressBroad, message: 'Invalid address.' }]"
              />
            </div>
            <div class="form-line mb-2">
              <BaseInput
                id="address_2"
                v-model.trim="booking.addressLine2"
                label="Address Line 2"
                :rule="[{ forField: 'addressLine2', validator: (val: string) => isValidAddressBroad(val, true), message: 'Invalid address.' }]"
              />
            </div>
            <div class="form-line">
              <BaseTextArea
                id="additional_info"
                v-model.trim="booking.info"
                label="Additional Information"
                :rows="4"
                :rule="[{ forField: 'info', validator: isSafeText, message: 'Invalid content.' }]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      id="dialog-bottom"
      class="px-4 py-5"
    >
      <InnerToast
        :message="conflictMessage"
        :show="showConflictMessage"
        @close="showConflictMessage = false"
      />
      <button
        class="bg-primary text-white px-4 py-2"
        style="border-radius: 8px; min-width: 300px;"
        :disabled="!canBeBooked"
        @click="submitBooking"
      >
        Book
      </button>
    </div>
  </dialog>
</template>

<style lang="scss" scoped>
#booking-dialog {
  width: 90%;
  padding: 0px;
  display: flex;
  position: fixed;
  flex-direction: column;
  justify-content: space-between;

  &.loading {
    pointer-events: none;

    &::before {
      display: block;
      height: 100%;
      width: 100%;
      pointer-events: none;
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      background: rgba(255, 255, 255, 0.4);
      z-index: 10;
    }
  }

  #dialog-inner {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;

    #dialog-close-btn {
      position: absolute;
      top: -12.5rem;
      right: -7.5rem;
      width: 15rem;
      height: 15rem;
      background-color: #1565C0;
      transform: rotate(45deg);
      display: flex;
      align-items: end;
      justify-content: end;
      padding-bottom: 0.5rem;
      padding-right: 2.75rem;
    }
  }
}

.personal-info {
  flex: 1;
}

.form-line {
  display: flex;
  gap: 10px;
}

#booking-form {
  display: flex;
  gap: 50px;

  #date-line {
    display: flex;
    flex-direction: column;
  }
}

#dialog-bottom {
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;

  button {
    position: relative;

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
}

@media screen and (max-width: 1184px) {
  .form-line {
    flex-direction: column;
  }

  :deep(.dp__outer_menu_wrap) {
    width: 100% !important;
  }

}

@media screen and (max-width: 1130px) {
  #booking-form {
    flex-direction: column;
  }

  #booking-dialog {
    display: block;
  }
}
</style>
