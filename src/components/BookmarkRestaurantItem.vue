<template>
   <div class="relative flex flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md  sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 mx-2">
    <!-- relative flex w-full max-w-[48rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md -->
  <div class="relative m-0 w-2/5 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-gray-700">
      <img class="h-full w-full object-cover" :src="restaurant.imageUrl" :alt="restaurant.name" style="position: relative;" />
      <div class="p-6">
        <!-- <h6 class="mb-4 block font-sans text-base font-semibold uppercase leading-relaxed tracking-normal text-pink-500 antialiased">
      {{restaurant.name}}
    </h6> -->
    <h4 class="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
     {{ restaurant.name }}
    </h4>
    <p class="mb-8 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
      <span v-for="cat in restaurant.category" :key="cat">
            {{ cat }}<span v-if="cat != restaurant.category.slice(-1)[0]">, </span>
          </span>
    </p>
        <!-- <div class="mb-2 text-base leading-relaxed text-body-color">
          <span v-for="cat in restaurant.category" :key="cat">
            {{ cat }}<span v-if="cat != restaurant.category.slice(-1)[0]">, </span>
          </span>
        </div> -->
        <div class="row mb-2" >
          <span class="col-4 row">
            <font-awesome-icon icon="fa-regular fa-star" style="color: black" class="col-6"/>
            <span class="col-6"> 4.5</span>
          </span>
          <span class="col-4 row">
            <font-awesome-icon icon="fa-regular fa-clock" style="color: black;" />
            <span> 30min</span>
          </span>
          <span>
            <font-awesome-icon icon="fa-solid fa-person" style="color: black"/>
            <span> 2.4km</span>
          </span>
        </div>
        <a href="javascript:void(0)"
          class="inline-block rounded-full border border-[#E5E7EB] py-2 px-7 text-base font-medium text-body-color transition hover:border-primary hover:bg-primary hover:text-white">
          View Details
        </a>
      </div>
    </div>
  </div>
</template>








<!-- <template>
    <div class="animate_top sg vk rm xm">
      <div class="c rc i z-1 pg">
        <img class="w-full" :src="restaurant.imageUrl" :alt="restaurant.name" style="position: relative;" />
        <div class="im h r s df vd yc wg tc wf xf al hh/20 nl il z-10">
          <a :href="'./restaurant-single/' + restaurant.id" class="vc ek rg lk gh sl ml il gi hi" >Read More</a>
        </div>
      </div>
      <div class="yh">
        <div class="tc uf wf ag jq">
          <div class="tc wf ag">
            <img src="../assets/images/icon-man.svg" alt="Owner" />
            <p>{{ restaurant.owner }}</p>
          </div>
          <div class="tc wf ag">
            <img src="../assets/images/icon-calender.svg" alt="Date Added" />
            <p>{{ restaurant.dateAdded }}</p>
          </div>
        </div>
        <h4 class="ek tj ml il kk wm xl eq lb">
          <a :href="'./restaurant-single/' + restaurant.id">{{ restaurant.name }}</a>
          <p>{{ restaurant.location }}</p>
          <p>{{ restaurant.details }}</p>
        </h4>
        <div style="color: blue;">
          <font-awesome-icon icon="fa-regular fa-bookmark" size="xl" v-if="restaurant.bookmark==false" @click="toggleBookmark"  />
          <font-awesome-icon icon="fa-solid fa-bookmark" size="xl" v-else @click="toggleBookmark"/>
        </div>
      </div>
    </div>
  </template>
   -->
<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  restaurant: Object
});

const restaurant = props.restaurant!;

const toggleBookmark = () => { restaurant.bookmark = !restaurant.bookmark; }

</script>


<style scoped>
/* h1 {
  color: red;
} */
</style>
