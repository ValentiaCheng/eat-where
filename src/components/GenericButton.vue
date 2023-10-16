<script setup lang="ts">
const props = defineProps({
  icon: {
    type: String,
    required: false,
  },
  iconSize: {
    type: String,
    required: false,
  },
  iconColour: {
    type: String,
    required: false,
  },
  iconRight: {
    type: Boolean,
    default: false,
  },
  titleColor: {
    type: String,
    default: "text-black",
  },
  bgColor: {
    type: String,
    default: "bg-white",
  },
  shadowColor: {
    type: String,
    default: "",
  },
  padding: {
    type: String,
    default: "py-3 px-8",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button
    :class="`${props.titleColor} ${props.shadowColor} ${props.padding} ${
      disabled ? 'bg-gray-300' : `${props.bgColor}`
    }`"
    class="rounded-3xl inline-flex justify-center align-center gap-x-3 w-fit min-w-[3rem] min-h-[2rem] max-h-[3rem]"
    :disabled="disabled"
  >
    <span v-if="props.icon && !iconRight">
      <va-icon
        :name="`${props.icon}`"
        :size="`${props.iconSize}`"
        :color="props.iconColour"
      />
    </span>
    <span class="font-medium inline-flex align-center gap-1.5"><slot /></span>
    <span v-if="props.icon && iconRight">
      <va-icon
        :name="`${props.icon}`"
        :size="`${props.iconSize}`"
        :color="props.iconColour"
      />
    </span>
  </button>
</template>
