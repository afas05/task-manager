<script setup lang="ts">
import type { Task } from "~~/types/task";
import { defineProps, ref, defineEmits } from 'vue';

const { tasks } = defineProps({
  tasks: {
    type: Array as () => Task[],
    required: true,
    default: () => []
  }
})
const emit = defineEmits([
    'task-added',
    'task-selected',
    'task-deleted'
]);
const newTaskTitle = ref('')

function addTask() {
  emit('task-added', newTaskTitle.value)
  newTaskTitle.value = ''
}

function selectTask(id: number) {
  emit('task-selected', id)
}
</script>

<template>
  <div class="flex flex-col w-full md:w-1/3 bg-[#313244] rounded-xl p-4 overflow-hidden">
    <h2 class="text-xl font-semibold mb-4 text-[#cba6f7]">Tasks</h2>
    <div class="flex items-center gap-2 mb-6">
      <input
        type="text"
        v-model="newTaskTitle"
        placeholder="New Task..."
        class="flex-1 px-3 py-2 bg-[#1e1e2e] border border-[#45475a] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#cba6f7] text-[#cdd6f4] placeholder-[#6c7086]"
      />
      <UButton @click="addTask" class="p-2 bg-[#cba6f7] hover:bg-[#b4befe] rounded-lg text-[#1e1e2e] transition-colors" aria-label="Add task">
        <UIcon name="ep:plus" class="size-5" />
      </UButton>
    </div>
    <div class="overflow-y-auto flex-grow">
      <div v-if="tasks.length < 1" class="text-center py-6 text-[#6c7086]">
        Create a new task.
      </div>
      <ul v-else class="space-y-2">
        <li
          v-for="task in tasks" :key="task.id"
          class="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors bg-[#1e1e2e] text-[#a6adc8] hover:bg-[#45475a] hover:text-[#cdd6f4]"
          @click.prevent="selectTask(task.id)"
        >{{ task.title }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>