<template>
    <div class="mx-auto mt-20 pt-10 border-gray-200 dark:border-gray-700 container lg:w-4/6 xl:w-4/7 sm:w-full md:w-2/3">
      <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        <li
          v-for="(tab, index) in tabs"
          :key="index"
          class="mr-2"
        >
          <a
            href="#"
            class="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg"
            :class="{ 'hover:text-orange-300 hover:border-orange-300 dark:hover:text-orange-300 group': !tab.active, 'text-orange-500 border-orange-500 dark:text-orange-500 dark:border-orange-500 group': tab.active }"
            @click="activateTab(index)"
          >
            <svg
              class="w-4 h-4 mr-2"
              :class="{ 'text-gray-400 group-hover:text-orange-00 dark:text-gray-500 dark:group-hover:text-orange-300': !tab.active }"
              :fill="getIconColor(tab.active)"
            >
              <path :d="tab.icon" /> <!-- Include the SVG path for each tab -->
            </svg>
            {{ tab.label }}
          </a>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        tabs: [
          { label: 'Profile', active: true, icon: 'M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z' },
          { label: 'Bookmarks', active: false, icon: 'M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z' }
        ],
      };
    },
    methods: {
      activateTab(index) {
        this.tabs.forEach((tab, i) => {
          tab.active = i === index;
        });
      },
      getIconColor(active) {
        return active ? 'orange' : 'currentColor';
      },
    },
  };
  </script>
  