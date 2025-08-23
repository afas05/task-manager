<script setup lang="ts">
import type { Task } from "~~/types/task";
import { ref } from 'vue';

definePageMeta({
  middleware: ['auth'],
})

const currentSelectedTask = ref<Task | undefined>(undefined);

async function selectTask(task: Task) {
  currentSelectedTask.value = task;
}

const { user, clear: clearSession } = useUserSession()

async function logout() {
  await clearSession()
  await navigateTo('/login')
}
</script>

<template>
  <div class="flex flex-col md:flex-row w-full max-w-7xl mx-auto p-4 gap-6 h-screen">
    <TaskList
      @task-selected="selectTask"
    ></TaskList>
    <TaskDetail
      v-if="currentSelectedTask"
      :task="currentSelectedTask"
    ></TaskDetail>
  </div>
</template>

<style scoped>

</style>