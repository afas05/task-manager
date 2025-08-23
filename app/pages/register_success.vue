<script setup lang="ts">
definePageMeta({
  layout: 'auth'
});
</script>

<template>
  <div class="text-center">
    <UIcon name="pajamas:check-circle" class="text-mintgreen-600 size-8"/>
  </div>
  <AuthHeader
      heading="You successfully created account"
      small-text=" to start managing your tasks"
      :add-sign-in-button="true"
  />
</template>

<style scoped>

</style>