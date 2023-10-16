import { defineStore } from "pinia";
import type { LatLng } from "@/types/location";
import { ref, type Ref } from "vue";

export const useCurrentLocationStore = defineStore(
  "currentLocationStore",
  () => {
    const address = ref("");
    const oldAddress = ref("");
    const latLng: Ref<LatLng | null> = ref(null);

    function setLocationAddress(newAddress: string) {
      address.value = newAddress;
    }
    function setOldLocationAddress(newAddress: string) {
      oldAddress.value = newAddress;
    }
    function setLocationLatLng(location: LatLng) {
      latLng.value = location;
    }

    return {
      address,
      oldAddress,
      latLng,
      setLocationAddress,
      setOldLocationAddress,
      setLocationLatLng,
    };
  },
);
