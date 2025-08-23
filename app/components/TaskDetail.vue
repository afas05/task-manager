<script setup lang="ts">
import { computed, ref, defineProps } from 'vue';
import type { SubTask } from "~~/types/SubTask";
import type { Task } from "~~/types/task";
import draggable from "vuedraggable";

const { task } = defineProps(
    {
      task: {
        type: Object as () => Task,
        required: true
      },
    }
);

const {data:subTasks, refresh } = await useAsyncData<SubTask[]>(
    () => $fetch("/api/subtasks/" + task.id),
    { deep: true }
);
const newSubTaskTitle = ref('');

async function addSubTask() {
  const title = newSubTaskTitle.value.trim();
  if (title === '') {
    return;
  }

  await $fetch("/api/subtasks/add", {
    method: 'POST',
    body: {
      title: newSubTaskTitle.value,
      task_id: task?.id
    }
  }).then(() => {
    refresh();
    newSubTaskTitle.value = ''
  });
}

async function changeSubTaskStatus(id: number) {
  if (subTasks.value === undefined) {
    return;
  }
  const index = subTasks.value.findIndex(task => task.id === id);

  if (subTasks.value[index]) {
    await $fetch(`/api/subtasks/${id}`, {
      method: 'PATCH',
      body: {
        done: subTasks.value[index].done
      }
    });
  }
}

async function deleteSubTask(id: number) {
  await $fetch("/api/subtasks/" + id, {
    method: 'DELETE'
  }).then(() => {
    refresh();
  });
}

async function reorder() {
  let order: number[] = [];
  subTasks.value!.forEach((item) => {
    order.push(item.id);
  });

  await $fetch("/api/subtasks/reorder", {
    method: 'POST',
    body: {
      order: order
    }
  });
}

const formattedDate = computed(() => {
  return new Date(task.created).toLocaleDateString('pl-Pl');
})
const daysAgo = computed(() => {
  const diff = new Date().getTime() - new Date(task.created).getTime();
  const millisecondsInADay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / millisecondsInADay);
})
const completedSubtasks = computed(() => {
  let completed = 0;
  if (subTasks.value === undefined) {
    return completed;
  }
  subTasks.value.forEach((subTask: SubTask) => {
    if (subTask.done) {
      completed++;
    }
  })

  return completed;
})
const completionPercentage = computed(() => {
  return completedSubtasks.value === 0 ? 0 : (completedSubtasks.value / subTasks.value!.length) * 100;
})

watch(() => task, () => {
  refresh();
});
</script>

<template>
  <div class="flex flex-col w-full md:w-2/3 bg-[#313244] rounded-xl p-4 overflow-hidden">
    <h2 class="text-xl font-semibold mb-1 text-[#cba6f7]">{{ task.title }}</h2>
    <p class="text-sm text-[#a6adc8] mb-4">
      Started on {{formattedDate}} ({{ daysAgo }} {{ daysAgo === 1 ? 'day' : 'days' }} ago)
    </p>
    <div class="mb-6">
    <div v-if="subTasks && subTasks.length > 0" class="flex justify-between text-sm mb-1">
      <span class="text-[#a6adc8]">
        {{ completedSubtasks }} of {{ subTasks.length }} subtasks completed
      </span>
      <span class="text-[#a6e3a1]">
        {{ Math.round(completionPercentage) }}%
      </span>
    </div>
    <div class="w-full bg-[#1e1e2e] rounded-full h-2">
      <div
        class="bg-[#a6e3a1] h-2 rounded-full transition-all duration-300 ease-in-out"
        :style="{
          width: completionPercentage + '%'
        }"
      ></div>
    </div>
  </div>
    <h3 class="font-medium text-[#f5c2e7] mb-2">Subtasks</h3>
    <div class="flex items-center gap-2 mb-4">
      <input
          type="text"
          v-model="newSubTaskTitle"
          placeholder="New item..."
          class="flex-1 px-3 py-2 bg-[#1e1e2e] border border-[#45475a] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#cba6f7] text-[#cdd6f4] placeholder-[#6c7086]"
          @keydown.enter="addSubTask"
      />
      <UButton @click="addSubTask" class="p-2 bg-[#f5c2e7] hover:bg-[#f2cdcd] rounded-lg text-[#1e1e2e] transition-colors" aria-label="Add task">
        <UIcon name="ep:plus" class="size-5" />
      </UButton>
    </div>
    <div class="overflow-y-auto flex-grow">
      <div v-if="subTasks!.length < 1" class="text-center py-6 text-[#6c7086]">
        No subtasks yet. Add one to get started!
      </div>
      <draggable
        v-else
        tag="ul"
        v-model="subTasks"
        handle=".drag-handle"
        item-key="title"
        class="space-y-2"
        @end="reorder"
      >
        <template #item="{ element }">
          <li class="flex items-center p-3 rounded-lg justify-between transition-colors bg-[#1e1e2e] text-[#a6adc8]">
            <div class="flex items-center gap-2">
              <UIcon name="uil:draggabledots" class="cursor-pointer size-4 drag-handle" />
              <UCheckbox v-model="element.done" color="mintgreen" class="cursor-pointer text-amber-50" @change="changeSubTaskStatus(element.id)"/>
              <span :class="{'line-through': element.done, 'text-stone-500': element.done,}">{{ element.title }}</span>
            </div>
            <div class="flex items-center hover:bg-[#45475a] rounded transition-colors p-1">
              <UIcon name="ic:baseline-delete-outline" class="size-5 text-[#f38ba8] cursor-pointer" @click="deleteSubTask(element.id)"/>
            </div>
          </li>
        </template>
      </draggable>
    </div>
  </div>
</template>
