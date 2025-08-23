<script setup lang="ts">
definePageMeta({
  name: 'auth',
})
</script>

<template>
  <div class="flex items-center justify-center min-h-screenbg-[#1e1e2e] p-4">
    <div class="w-full max-w-md bg-[#313244] rounded-xl shadow-lg p-6">
      <slot />
    </div>
  </div>
</template>
