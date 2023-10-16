import { ref } from "vue";
import { defineStore } from "pinia";
import type { Restaurant } from "@/types/Restaurant";

export const useUpvoteRestaurantsStore = defineStore(
  "upvoteRestaurants",
  () => {
    const upvoteCount = ref(0);
    const restaurants = ref<Restaurant[]>([]);

    function addRestaurant(restaurant: Restaurant) {
      restaurants.value.push(restaurant);
      upvoteCount.value++;
    }
    function removeRestaurant(id: string) {
      const newRestaurants = restaurants.value.filter(
        (restaurant) => restaurant.place_id !== id,
      );
      restaurants.value = newRestaurants;
      upvoteCount.value--;
    }
    function clearRestaurants() {
      restaurants.value = [];
    }

    return {
      upvoteCount,
      restaurants,
      addRestaurant,
      removeRestaurant,
      clearRestaurants,
    };
  },
);
