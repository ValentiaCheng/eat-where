

<template>
  <button
    class="scroll-button bg-white hover:bg-black hover:text-white text-black font-bold py-2 px-4 rounded-full"  @click="$emit('filterEvent', category)">{{category}}</button>
</template>

<!-- <script lang="ts"> -->
// export default {
//   data() {
//     return {
//       category: ['Japanese', 'Western'],
//     };
//   },
// };

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  category: String,
  onButtonClick: Function
});

const category = props.category!;


const sendValueToParent = () => {
  // Call the function passed as a prop to send the value to the parent component
  props.onButtonClick?.(category);
};

// const toggleBookmark = () => { restaurant.bookmark = !restaurant.bookmark; }

// const toggleBookmark = () => {
//   if (restaurant.bookmark) {
//     restaurant.bookmark = false;
//   } else {
//     restaurant.bookmark = true;
//   }
// }

</script>

<style scoped>
/* rounded-lg bg-blue-600 px-4 py-2 text-white inline-flex */
.scroll-button {
  /* min-width: 120px;  */
  text-align: center;
  /* padding: 9px; */
  /* padding-left: 1.5rem; */
  /* padding-right: 1.5rem; */
  /* background-color: lime; */
  /* color: black; */
  /* border: none; */
  /* border-radius: 2rem; */
  /* margin-right: 10px; */
  /* margin-top: 10px; */
  /* margin-bottom: 10px;  */
  /* border-color: black; */
  /* height: 2.5rem; */
}
</style>