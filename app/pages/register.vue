<script setup lang="ts">
import {reactive, ref} from "vue";

definePageMeta({
  layout: 'auth'
});

const formData = reactive({
  email: '',
  password: '',
  confirm_password: '',
  name: '',
});

const state = reactive({
  email: false,
  password: false,
  confirm_password: false,
  name: false,
});

const loading = ref<boolean>(false);
const error = ref<String | null>(null);

// TODO: replace with full form validation
function validateForm(): boolean {
  if (formData.password !== formData.confirm_password) {
    state.confirm_password = true;
    return false;
  } else {
    return true;
  }
}

async function register() {
  if (!validateForm()) {
    return;
  }
  loading.value = true;
  $fetch('/api/register', {
    method: 'POST',
    body: formData
  }).then(async () => {
    loading.value = false;
    await navigateTo('/register_success');
  }).catch(err => {
    error.value = err.response.statusText;
    loading.value = false;
  });
}
</script>

<template>
  <AuthHeader
      heading="Create Account"
      small-text="Sign up to start managing your tasks"
  />

  <div
      v-if="error"
      class="flex items-center gap-2 p-3 mb-4 bg-[#f38ba8]/10 border border-[#f38ba8] rounded-lg text-[#f38ba8]"
  >
    <UIcon name="tdesign:error-circle" class="size-5 text-[#f38ba8]" />
    <span>{{ error }}</span>
  </div>

  <form @submit.prevent="register" class="space-y-4">
    <div>
      <label
          for="username"
          class="block text-sm font-medium text-[#a6adc8] mb-1"
      >
        Name
      </label>
      <input
        id="username"
        type="text"
        v-model="formData.name"
        class="w-full px-4 py-2 bg-[#1e1e2e] border border-[#45475a] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#cba6f7] text-[#cdd6f4] placeholder-[#6c7086]"
        placeholder="johndoe"
        required
      />
    </div>
    <div>
      <label
        for="email"
        class="block text-sm font-medium text-[#a6adc8] mb-1"
      >
        Email
      </label>
      <input
        id="email"
        type="email"
        v-model="formData.email"
        class="w-full px-4 py-2 bg-[#1e1e2e] border border-[#45475a] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#cba6f7] text-[#cdd6f4] placeholder-[#6c7086]"
        placeholder="your.email@example.com"
        required
      />
    </div>
    <div>
      <label
          for="password"
          class="block text-sm font-medium text-[#a6adc8] mb-1"
      >
        Password
      </label>
      <input
        id="password"
        type="password"
        v-model="formData.password"
        class="w-full px-4 py-2 bg-[#1e1e2e] border border-[#45475a] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#cba6f7] text-[#cdd6f4]"
        placeholder="••••••••"
        required
      />
    </div>
    <div>
      <label
          for="confirmPassword"
          class="block text-sm font-medium text-[#a6adc8] mb-1"
      >
        Confirm Password
      </label>
      <input
        id="confirmPassword"
        type="password"
        v-model="formData.confirm_password"
        class="w-full px-4 py-2 bg-[#1e1e2e] border border-[#45475a] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#cba6f7] text-[#cdd6f4]"
        placeholder="••••••••"
        required
      />
      <span v-if="state.confirm_password" class="block text-sm font-medium text-[#f38ba8] px-2">Passwords must match</span>
    </div>
    <UButton
        type="submit"
        :disabled="loading"
        :class="[
          'w-full flex items-center justify-center gap-2 py-2 px-4 bg-[#cba6f7] hover:bg-[#b4befe] text-[#1e1e2e] font-medium rounded-lg transition-colors',
          { 'opacity-70 cursor-not-allowed': loading }
        ]"
    >
      <template v-if="loading">
        <UIcon name="line-md:loading-loop"/>
        <span>Creating account...</span>
      </template>
      <template v-else>
        <UIcon name="material-symbols:person-add-outline" />
        <span>Sign Up</span>
      </template>
    </UButton>
  </form>
  <div class="mt-6 text-center">
    <p class="text-[#a6adc8]">
      Already have an account?
      <NuxtLink to="/login" class="text-[#cba6f7] hover:underline">
        Log in
      </NuxtLink>
    </p>
  </div>
</template>

<style scoped>

</style>