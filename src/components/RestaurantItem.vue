<template>
    <div class="animate_top sg vk rm xm">
      <div class="c rc i z-1 pg">
        <img class="w-full" :src="restaurant.imageUrl" :alt="restaurant.name" />
        <div class="im h r s df vd yc wg tc wf xf al hh/20 nl il z-10">
          <a :href="'./restaurant-single/' + restaurant.id" class="vc ek rg lk gh sl ml il gi hi">Read More</a>
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
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  
  const props = defineProps({
    restaurant: Object
  });
  
  const restaurant = props.restaurant!;
  </script>