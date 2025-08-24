<script setup lang="ts">
import {reactive, ref} from "vue";
const { loggedIn, user, fetch: refreshSession } = useUserSession();

definePageMeta({
  layout: 'auth'
});

const credentials = reactive({
  email: '',
  password: '',
});

const loading = ref<boolean>(false);
const error = ref<string | null>(null);

async function login() {
  loading.value = true;
  $fetch('/api/login', {
    method: 'POST',
    body: credentials
  })
  .then(async () => {
    loading.value = false;
    await refreshSession();
    await navigateTo('/');
  })
  .catch((err) => {
    error.value = err.response.statusText;
    loading.value = false;
  });
}
</script>

<template>
  <AuthHeader
    heading="Welcome Back"
    small-text="Log in to access your tasks"
  />

  <div
    v-if="error"
    class="flex items-center gap-2 p-3 mb-4 bg-[#f38ba8]/10 border border-[#f38ba8] rounded-lg text-[#f38ba8]"
  >
    <UIcon name="tdesign:error-circle" class="size-5 text-[#f38ba8]" />
    <span>{{ error }}</span>
  </div>
  <form @submit.prevent="login" class="space-y-4">
    <div>
      <label
          for="email"
          class="block text-sm font-medium text-[#a6adc8] mb-1"
      >
        Email
      </label>
      <input
          v-model="credentials.email"
          type="email"
          class="w-full px-4 py-2 bg-[#1e1e2e] border border-[#45475a] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#cba6f7] text-[#cdd6f4] placeholder-[#6c7086]"
          placeholder="your.email@example.com"
          required
      />
    </div>
    <div>
      <div class="flex justify-between mb-1">
        <label
            for="password"
            class="block text-sm font-medium text-[#a6adc8]"
        >
          Password
        </label>
      </div>
      <input
          id="password"
          type="password"
          v-model="credentials.password"
          class="w-full px-4 py-2 bg-[#1e1e2e] border border-[#45475a] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#cba6f7] text-[#cdd6f4]"
          placeholder="••••••••"
          required
      />
    </div>
    <UButton
      v-if="!loading"
      type="submit"
      :disabled="loading"
      class="w-full flex items-center justify-center gap-2 py-2 px-4 bg-[#cba6f7] hover:bg-[#b4befe] text-[#1e1e2e] font-medium rounded-lg transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}"
    >
      <UIcon name="mynaui:login-solid" />
      <span>Log In</span>
    </UButton>
    <div
      v-else
      class="w-full flex items-center justify-center gap-2 py-2 px-4"
    >
      <UIcon name="line-md:loading-loop"/>
      <span class="text-[#a6adc8]">Logging in...</span>
    </div>
  </form>
  <div class="mt-6 text-center">
    <p class="text-[#a6adc8]">
      Don't have an account?
      <NuxtLink to="/register" class="text-[#cba6f7] hover:underline">
        Sign up
      </NuxtLink>
    </p>
  </div>
</template>

<style scoped>

</style>