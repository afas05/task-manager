<script setup lang="ts">
import type { Task } from "~~/types/task";
import { useTemplateRef, ref } from 'vue';
import TaskList from "~/components/TaskList.vue";

definePageMeta({
  middleware: ['auth'],
})

const currentSelectedTask = ref<Task | undefined>(undefined);
const taskListRef = useTemplateRef('taskListRef');

async function selectTask(task: Task) {
  currentSelectedTask.value = task;
}

const { user, clear: clearSession } = useUserSession()

async function logout() {
  await clearSession()
  await navigateTo('/login')
}

function updateComplete(index: number, value: number) {
  taskListRef.value?.updateComplete(index, value);
}
</script>

<template>
  <div class="flex flex-col md:flex-row w-full max-w-7xl mx-auto p-4 gap-6 h-screen">
    <TaskList
      ref="taskListRef"
      @task-selected="selectTask"
    ></TaskList>
    <TaskDetail
      v-if="currentSelectedTask"
      :task="currentSelectedTask"
      @update-complete="updateComplete"
    ></TaskDetail>
  </div>
</template>

<style scoped>

</style>