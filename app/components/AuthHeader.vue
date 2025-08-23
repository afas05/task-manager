<script setup lang="ts">
import {defineProps} from 'vue';

defineProps({
  heading: {
    type: String,
    required: true,
  },
  smallText: {
    type: String,
    required: true,
  },
  addSignInButton: {
    type: Boolean,
    default: false,
  }
})
</script>

<template>
  <div class="text-center mb-8">
    <h1 class="text-3xl font-bold text-[#cba6f7] mb-2">
      {{ heading }}
    </h1>
    <p class="text-[#a6adc8]">
      <NuxtLink v-if="addSignInButton" class="text-[#cba6f7]" to="/login">Sign In</NuxtLink>
      {{ smallText }}
    </p>
  </div>
</template>

<style scoped>

</style>