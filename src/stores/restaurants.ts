import { ref } from "vue";
import { defineStore } from "pinia";
import type { Restaurant } from "@/types/Restaurant";

export const useRestaurantsStore = defineStore("restaurants", () => {
  const restaurants = ref<Restaurant[]>([]);
  function addRestaurant(restaurant: Restaurant) {
    restaurant.upvote_count = 0;
    restaurants.value.push(restaurant);
  }
  function clearRestaurants() {
    restaurants.value = [];
  }

  return {
    restaurants,
    addRestaurant,
    clearRestaurants,
  };
});
