<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps(['task'])
const newSubTaskTitle = ref('')
const subTasks = ref([])

async function getSubTasks() {
  subTasks.value = await $fetch("/api/subTasks/" + task.id)
}

async function addSubTask() {}

const formattedDate = computed(() => {
  return task.created
})
const daysAgo = computed(() => {
  return 1;
})
const completedSubtasks = computed(() => {
  return 1;
})
const completionPercentage = computed(() => {
  return 100;
})
</script>

<template>
  <div class="flex flex-col w-full md:w-2/3 bg-[#313244] rounded-xl p-4 overflow-hidden">
    <h2 class="text-xl font-semibold mb-1 text-[#cba6f7]">{task.text}</h2>
    <p class="text-sm text-[#a6adc8] mb-4">
      Started on {{formattedDate}} ({{ daysAgo }} {{ daysAgo === 1 ? 'day' : 'days' }} ago)
    </p>
    <div class="mb-6">
    <div v-if="subTasks.length > 0" class="flex justify-between text-sm mb-1">
            <span class="text-[#a6adc8]">
              {{ completedSubtasks }} of {{ subTasks.lenght }} subtasks completed
            </span>
      <span class="text-[#a6e3a1]">
              {Math.round(completionPercentage)}%
            </span>
    </div>
    <div class="w-full bg-[#1e1e2e] rounded-full h-2">
      <div
        class="bg-[#a6e3a1] h-2 rounded-full"
        :style="{
          width: completionPercentage + '%'
        }"
      ></div>
    </div>
  </div>
    <h3 class="font-medium text-[#f5c2e7] mb-2">Subtasks</h3>
    <div class="flex items-center gap-2 mb-4">
      <UInput
          v-model="newSubTaskTitle"
          placeholder="New item..."
          class="flex-1 px-3 py-2 bg-[#1e1e2e] border border-[#45475a] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#cba6f7] text-[#cdd6f4] placeholder-[#6c7086]" />
      <UButton @click="addSubTask" class="p-2 bg-[#cba6f7] hover:bg-[#b4befe] rounded-lg text-[#1e1e2e] transition-colors" aria-label="Add task">
        <UIcon name="ep:plus" class="size-5" />
      </UButton>
    </div>
    <div class="overflow-y-auto flex-grow">
      <div v-if="subTasks.length < 1" class="text-center py-6 text-[#6c7086]">
        No subtasks yet. Add one to get started!
      </div>
      <ul v-else class="space-y-2">
        <li
            v-for="task in subTasks" :key="task.id"
            class="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors bg-[#1e1e2e] text-[#a6adc8] hover:bg-[#45475a] hover:text-[#cdd6f4]"
            @click.prevent="selectTask(task.id)"
        >{{ task.title }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>