<script setup lang="ts">
import type { Task } from "~~/types/task";
import { ref, defineEmits } from 'vue';
import draggable from "vuedraggable";

const selectedTask = ref<Task | undefined>(undefined);
const emit = defineEmits(['task-selected']);
const newTaskTitle = ref<string>('');
const {data:tasks, refresh} = await useAsyncData<Task[]>(() => $fetch("/api/tasks"));

async function addTask() {
  const title = newTaskTitle.value.trim();
  if (title === '') {
    return;
  }
  await $fetch("/api/tasks", {
    method: 'POST',
    body: {
      title: title
    }
  }).then(() => {
    refresh();
    newTaskTitle.value = ''
  });
}

function selectTask(index: number) {
  selectedTask.value = tasks.value![index];
  emit('task-selected', selectedTask.value);
}

async function reorder() {
  let order: number[] = [];
  tasks.value!.forEach((item) => {
    order.push(item.id);
  });
  await $fetch("/api/tasks/reorder", {
    method: 'POST',
    body: {
      order: order
    }
  });
}

async function deleteTask(id: number) {
  await $fetch(`/api/tasks/${id}`, {
    method: 'DELETE'
  }).then(() => {
    refresh();
  })
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
        @keydown.enter="addTask"
      />
      <UButton
        class="p-2 bg-[#cba6f7] hover:bg-[#b4befe] rounded-lg text-[#1e1e2e] transition-colors"
        aria-label="Add task"
        @click="addTask"
      >
        <UIcon name="ep:plus" class="size-5" />
      </UButton>
    </div>
    <div class="overflow-y-auto flex-grow">
      <div v-if="tasks && tasks.length < 1" class="text-center py-6 text-[#6c7086]">
        Create a new task.
      </div>
      <draggable
        v-else
        tag="ul"
        v-model="tasks"
        handle=".drag-handle"
        item-key="title"
        class="space-y-2"
        @end="reorder"
      >
        <template #item="{ element, index }">
          <li
            class="flex items-center justify-between content-center gap-2 p-3 rounded-lg cursor-pointer transition-colors bg-[#1e1e2e] text-[#a6adc8] hover:bg-[#45475a] hover:text-[#cdd6f4]"
            :class="{'bg-[#45475a]': selectedTask?.id === element.id}"
            @click.prevent="selectTask(index)"
          >
            <div class="flex items-center gap-2">
              <UIcon name="uil:draggabledots" class="size-4 drag-handle" />
              {{ element.title }}
            </div>
            <div class="flex items-center hover:bg-[#45475a] rounded transition-colors p-1">
              <UIcon name="ic:baseline-delete-outline" class="size-5 text-[#f38ba8] cursor-pointer" @click="deleteTask(element.id)"/>
            </div>
          </li>
        </template>
      </draggable>
    </div>
  </div>
</template>

<style scoped>

</style>