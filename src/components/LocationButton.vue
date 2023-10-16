<script setup lang="ts">
import { useCurrentLocationStore } from "@/stores/currentLocation";
import { storeToRefs } from "pinia";
import { computed } from "vue";
const currentLocationStore = useCurrentLocationStore();
const { address } = storeToRefs(currentLocationStore);

const displayLocation = computed(() => {
  let retVal = "Current Location";
  if (address.value !== "") retVal = address.value;
  return retVal;
});
</script>

<template>
  <div
    class="bg-white flex align-center gap-x-2.5 shadow-default rounded-3xl py-6 px-6"
  >
    <va-icon
      class="text-primary"
      name="location_on"
      style="display: contents"
      size="1.8rem"
    />
    <span class="text-[#7E7571] text-xl font-medium">
      {{ displayLocation }}
    </span>
  </div>
</template>
