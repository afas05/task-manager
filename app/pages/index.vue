<script setup lang="ts">
import type { Task } from "~~/types/task";
import { computed, ref } from 'vue';

definePageMeta({
  name: "Home",
  layout: "default",
})

const {data:tasks, refresh} = await useAsyncData<Task[]>(() => $fetch("/api/tasks"));
const selectedTask = ref<number | null>(null);
const currentSelectedTask = computed<Task | undefined>(() => {
  if (tasks.value && selectedTask.value === null) {
    return tasks.value.find(task => task.id === selectedTask.value);
  }
  return undefined;
});

async function addTask(title: string) {
  await $fetch("/api/tasks", {
    method: 'POST',
    body: {
      title: title
    }
  });
  refresh();
}

async function deleteTask(id: number) {
  await $fetch(`/api/tasks/${id}`, {
    method: 'DELETE'
  })
  refresh();
}
</script>

<template>
  <div class="flex flex-col md:flex-row w-full max-w-7xl mx-auto p-4 gap-6 h-screen">
    <TaskList
      :tasks="tasks || []"
      @taskAdded="addTask"
      @task-selected="selectedTask = $event"
      @task-deleted="deleteTask"
    ></TaskList>
    <TaskDetail
      v-if="selectedTask"
      :task="currentSelectedTask"
    ></TaskDetail>
  </div>
</template>

<style scoped>

</style>