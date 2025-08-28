<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const { user, clear: clearSession } = useUserSession();

const items = ref<DropdownMenuItem[]>([
  [
    {
      label: user.value?.name,
      type: 'label',
      class: 'text-[#cba6f7]',
    },
    {
      label: user.value?.email,
      type: 'label',
      class: 'text-[#a6adc8]',
    }
  ],
  [
    // {
    //   label: 'Profile',
    //   icon: 'i-lucide-user'
    // },
    {
      label: 'Sign Out',
      icon: 'si:sign-out-alt-duotone',
      class: 'text-[#f38ba8]',
      onSelect() {
        logout();
      }
    }
  ]
]);

async function logout() {
  await clearSession();
  await navigateTo('/login');
}
</script>

<template>
  <header class="bg-[#313244] p-4 shadow w-full">
    <div class="flex justify-between items-center max-w-7xl mx-auto px-4" data-id="element-22">
      <h1 class="text-xl font-bold text-[#cba6f7]" data-id="element-23">Task Manager</h1>
      <nav class="flex items-center gap-6" data-id="element-24">
        <UDropdownMenu
          :items="items"
          :content="{
            align: 'start',
            side: 'bottom',
            sideOffset: 8
          }"
          :ui="{ content: 'w-48' }"
          class="bg-[#313244]"
        >
          <UButton
            icon="material-symbols:person-outline"
            color="neutral"
            variant="outline"
            class="flex items-center gap-2 px-3 py-2 bg-[#45475a] hover:bg-[#585b70] rounded-lg transition-colors p-2.5"
          >
            <div class="text-[#a6adc8]">{{ user?.name }}</div>
            <UIcon name="mdi:chevron-down" class="size-5"/>
          </UButton>
        </UDropdownMenu>
      </nav>
    </div>
  </header>
</template>

<style scoped>

</style>