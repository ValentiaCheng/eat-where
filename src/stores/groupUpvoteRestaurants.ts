import { ref } from "vue";
import { defineStore } from "pinia";
import type { Restaurant } from "@/types/Restaurant";

export const useGroupUpvoteRestaurantsStore = defineStore(
  "groupUpvoteRestaurants",
  () => {
    const restaurants = ref<Restaurant[]>([]);
    function addRestaurant(restaurant: Restaurant) {
      const foundRestaurantIdx = restaurants.value.findIndex(
        (result) => result.place_id === restaurant.place_id,
      );

      if (foundRestaurantIdx === -1) {
        restaurant.upvote_count = 1;
        restaurants.value.push(restaurant);
      } else {
        const foundRestaurant = restaurants.value[foundRestaurantIdx];
        if (foundRestaurant.upvote_count) {
          foundRestaurant.upvote_count++;
        } else {
          foundRestaurant.upvote_count = 1;
        }

        restaurants.value[foundRestaurantIdx] = foundRestaurant;
      }
    }

    function removeRestaurant(id: string) {
      const foundRestaurant = restaurants.value.find(
        (result) => result.place_id === id,
      );

      console.log(
        "groupUpvotedRestaurants: (groupUpvotedRestaurants.ts)",
        foundRestaurant,
      );

      if (foundRestaurant == undefined) {
        console.log("restaurant does not exist or not added to upvote list");
        return;
      }

      if (foundRestaurant.upvote_count === undefined) {
        const newRestaurants = restaurants.value.filter((result) => {
          return result.place_id !== foundRestaurant.place_id;
        });
        restaurants.value = newRestaurants;
        return;
      }

      if (foundRestaurant.upvote_count === 1) {
        const newRestaurants = restaurants.value.filter((result) => {
          return result.place_id !== foundRestaurant.place_id;
        });
        restaurants.value = newRestaurants;
      } else {
        foundRestaurant.upvote_count -= 1;
      }
    }

    function clearRestaurants() {
      restaurants.value = [];
    }
    return { restaurants, addRestaurant, removeRestaurant, clearRestaurants };
  },
);
