<script lang="ts" setup>
definePageMeta({
  middleware: 'guest',
});

const router = useRouter()

const credentials = ref({
  name: '',
  password: '',
});

const errorMsg = ref('');

const submit = async () => {
  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: credentials.value,
    });
    router.push('/admin');
  }
  catch (e) {
    errorMsg.value = e.response.statusText;
    console.log(123, errorMsg.value);
  }
};
</script>

<template>
  <div id="login-form">
    <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
      <div class="login-card px-4 py-5">
        <div class="mb-3">
          <h3 class="primary mb-5">
            Login
          </h3>
          <div>
            <BaseInput
              id="name"
              v-model.trim="credentials.name"
              label="Name"
            />

            <BaseInput
              id="password"
              v-model.trim="credentials.password"
              label="Password"
              type="password"
            />
          </div>
        </div>
        <div>
          <div
            class="p-1"
            style="color: #c94471; font-size: 0.8em; height: 1.2em; text-align: center;"
          >
            {{ errorMsg }}
          </div>
          <button
            class="bg-primary px-4 py-1 mt-2"
            style="width: 100%; border-radius: 8px;"
            @click="submit"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-card {
  box-shadow:   0 1px 3px rgba(0, 0, 0, 0.12),
    0 8px 24px rgba(0, 0, 0, 0.18);
  border-radius: 8px;
  background-color: white;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
