

<template>
  <button
    class="scroll-button text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 py-2 px-4 rounded-full" @click="sendValueToParent">{{category}}</button>
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
  min-width: 120px; 
  /* text-align: center;
  padding: 4px 4px;
  background-color: orange;
  color: #fff;
  border: none;
  border-radius: 10px; */
  margin-right: 10px; 
}
</style>