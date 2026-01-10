<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
});

const router = useRouter();

const bookingDetails = useTemplateRef('bookingDetails');
const loading = ref(false);

const passwords = ref({
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
});

const inputStatus = ref<Record<string, boolean>>({
  oldPassword: false,
  newPassword: false,
  confirmNewPassword: false,
});

const canChangePassword = computed(() => {
  return (
    inputStatus.value.oldPassword
    && inputStatus.value.newPassword
    && inputStatus.value.confirmNewPassword
  );
});

provide(BookingDialogFormInputStatusSetter, (field: string, status: boolean) => {
  inputStatus.value[field] = status;
});

const activeTab = ref('bookings');

const rowSelected = (booking) => {
  bookingDetails.value.open(booking);
};

const confirmChange = async () => {
  try {
    loading.value = true;
    await $fetch('/api/admin/change-password', {
      method: 'POST',
      body: {
        oldPassword: passwords.value.oldPassword,
        newPassword: passwords.value.newPassword,
      },
    });
    alert('Password changed successfully.');
    passwords.value.oldPassword = '';
    passwords.value.newPassword = '';
    passwords.value.confirmNewPassword = '';
  }
  catch (error) {
    alert('Error changing password');
  }
  finally {
    loading.value = false;
  }
};

const logout = async () => {
  await $fetch('/api/auth/logout', {
    method: 'POST',
  });
  window.location.href = '/login';
};
</script>

<template>
  <div class="px-4 mb-5 mt-5">
    <div class="admin-panel px-4 py-5">
      <div
        class="mb-5"
        style="display: flex; justify-content: end;"
      >
        <button
          class="bg-primary px-3 py-1"
          style="border-radius: 8px;"
          @click="logout"
        >
          Logout
        </button>
      </div>
      <div class="admin-tabs">
        <span
          :class="{ 'active-tab': activeTab === 'bookings' }"
          @click="activeTab = 'bookings'"
        >Manage Bookings</span>
        <span
          :class="{ 'active-tab': activeTab === 'change-password' }"
          @click="activeTab = 'change-password'"
        >Change password</span>
      </div>
      <hr
        class="my-5"
        style="border: 1px solid #ddd;"
      >
      <div v-if="activeTab === 'bookings'">
        <h4 class="mb-5">
          Bookings
        </h4>
        <div
          v-if="loading"
          class="loading-screen"
        >
          <Loader />
        </div>
        <div v-show="!loading">
          <BookingsTable
            @booking-selected="rowSelected"
            @bookings-loading="loading = $event"
          />
        </div>
      </div>
      <div v-if="activeTab === 'change-password'">
        <h4 class="mb-5">
          Change Password
        </h4>
        <div class="mt-5">
          <BaseInput
            id="old-password"
            v-model="passwords.oldPassword"
            label="Old Password"
            type="password"
            :rule="[{ forField: 'oldPassword', validator: (str) => str.length !== 0, message: 'This field is required' }]"
          />
          <BaseInput
            id="new-password"
            v-model="passwords.newPassword"
            label="New Password"
            type="password"
            :rule="[{ forField: 'newPassword', validator: (str) => str.length >= 5, message: 'Should be atleast 5 characters' }]"
          />
          <BaseInput
            id="confirm-new-password"
            v-model="passwords.confirmNewPassword"
            label="Confirm New Password"
            type="password"
            :rule="[{ forField: 'confirmNewPassword', validator: (str) => str === passwords.newPassword, message: 'Passwords do not match.' }]"
          />
          <div
            class="mt-5"
            style="display: flex; justify-content: end;"
          >
            <button
              id="change-password-btn"
              class="bg-primary px-4 py-1"
              style="border-radius: 8px;"
              :disabled="!canChangePassword"
              @click="confirmChange"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
    <BookingDetailsModal ref="bookingDetails" />
  </div>
</template>

<style scoped lang="scss">
.admin-panel {
  min-height: 600px;
  background-color: white;
  border-radius: 8px;
  overflow-x: auto;
  box-shadow:   0 1px 3px rgba(0, 0, 0, 0.12),
    0 8px 24px rgba(0, 0, 0, 0.18);
  position: relative;

  .admin-tabs {
    display: flex;
    align-items: center;
    gap: 2rem;
    color: #b1b1b3;
    transition: 0.25s linear;
    cursor: pointer;

    .active-tab {
      color: #1565C0
    }
  }

  #change-password-btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
}

.loading-screen {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: rgba(255 , 255, 255, 0.8);
}
</style>
