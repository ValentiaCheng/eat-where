import { onMounted, ref } from "vue";
import { useCurrentLocationStore } from "@/stores/currentLocation";
import type { LatLng } from "@/types/location";
import ky from "ky";

export function useGeolocation() {
  const MAP_KEY = import.meta.env.VITE_MAPS_API_KEY;
  const coords = ref<LatLng>({ lat: 0, lng: 0 });
  const address = ref("");
  const isSupported = "navigator" in window && "geolocation" in navigator;

  // let watcher: number | null = null;

  onMounted(async () => {
    const currentLocationStore = useCurrentLocationStore();
    coords.value = {
      lat: 0,
      lng: 0,
    };
    if (isSupported && currentLocationStore.latLng === null) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        coords.value = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        currentLocationStore.setLocationLatLng(coords.value);

        const res = (await ky(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.value.lat},${coords.value.lng}&key=${MAP_KEY}`,
        ).json()) as google.maps.GeocoderResponse;
        const result = res.results[0];
        address.value = result.formatted_address;
      });
    } else if (currentLocationStore.latLng) {
      coords.value = {
        lat: currentLocationStore.latLng.lat,
        lng: currentLocationStore.latLng.lng,
      };

      const res = (await ky(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.value.lat},${coords.value.lng}&key=${MAP_KEY}`,
      ).json()) as google.maps.GeocoderResponse;
      const result = res.results[0];
      address.value = result.formatted_address;
    }
  });

  return { coords, address, isSupported };
}
