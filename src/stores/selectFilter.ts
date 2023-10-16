import { defineStore } from "pinia";
import { ref } from "vue";

const prices = ["Inexpensive", "Moderate", "Expensive", "Very Expensive"];
const distances = ["500m", "1km", "2km", "5km"];
const filterTags = ["All", "Fastfood", "Halal", "Western", "Japanese"];

export const useSelectFilterStore = defineStore("selectFilter", () => {
  const selectedPrice = ref(prices[0]);
  const oldSelectedPrice = ref(prices[0]);

  const selectedDistance = ref(distances[0]);
  const oldSelectedDistance = ref(distances[0]);

  const selectedTag = ref(filterTags[0]);
  const oldSelectedTag = ref(filterTags[0]);

  function setSelectedPrice(value: string) {
    selectedPrice.value = value;
  }
  function setOldSelectedPrice(value: string) {
    oldSelectedPrice.value = value;
  }

  function setSelectedDistance(value: string) {
    selectedDistance.value = value;
  }
  function setOldSelectedDistance(value: string) {
    oldSelectedDistance.value = value;
  }

  function setSelectedTag(value: string) {
    selectedTag.value = value;
  }
  function setOldSelectedTag(value: string) {
    oldSelectedTag.value = value;
  }

  return {
    selectedPrice,
    oldSelectedPrice,
    selectedDistance,
    oldSelectedDistance,
    selectedTag,
    oldSelectedTag,
    setSelectedPrice,
    setOldSelectedPrice,
    setSelectedDistance,
    setOldSelectedDistance,
    setSelectedTag,
    setOldSelectedTag,
  };
});
