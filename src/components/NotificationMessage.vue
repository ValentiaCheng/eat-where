<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  bgColor: {
    type: String,
    default: "bg-blue-500",
  },
});

const isVisible = ref(true);

const closeNotification = () => {
  console.log("aaa");

  isVisible.value = false;
};
</script>

<template>
  <aside
    v-if="isVisible"
    :class="bgColor"
    class="w-full rounded-xl p-5 text-white inline-flex justify-between align-center"
  >
    <span>{{ message }}</span>
    <va-icon
      name="close"
      class="hover:cursor-pointer"
      @click="closeNotification"
    />
  </aside>
</template>
