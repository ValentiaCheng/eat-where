<script setup lang="ts">
/* eslint-disable no-undef */
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import GenericButton from '@/components/GenericButton.vue'
import { useGeolocation } from '../composables/useGeolocation'
import { Loader } from '@googlemaps/js-api-loader'
import { useCurrentLocationStore } from '@/stores/currentLocation'
import { computed, ref, type Ref, onMounted, onUnmounted, watch } from 'vue'
import ky from 'ky'

const currentLocation = useCurrentLocationStore();

type Position = {
  coords: {
    latitude: number
    longitude: number
  }
}

const MAP_KEY = import.meta.env.VITE_MAPS_API_KEY

const { coords } = useGeolocation()
const currPos = computed(() => ({
  lat: coords.value.lat,
  lng: coords.value.lng
}))

const locationSetCoords = ref({
  lat: currPos.value.lat,
  lng: currPos.value.lng
})

const isNotificationVisible = ref(false)

const isDisabled = ref(false)
const loader = new Loader({ apiKey: MAP_KEY })
const mapRef: Ref<HTMLElement | null> = ref(null)
const map: Ref<google.maps.Map | null> = ref(null)
let clickListener: object | any = null
const otherPosRef: Ref<{ lat: number; lng: number } | null> = ref(null)
let marker: google.maps.Marker | null = null

const currentLocationRef = ref('')
const newCoords = ref({ lat: currPos.value.lat, lng: currPos.value.lng })

const fetchCurrentLocationAddress = async (pos: { lat: number; lng: number }) => {
  const res = (await ky(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.lat},${pos.lng}&key=${MAP_KEY}`
  ).json()) as google.maps.GeocoderResponse
  const result = res.results[0]
  currentLocationRef.value = result.formatted_address
  currentLocation.setLocationAddress(result.formatted_address)
  console.log('OLD ADDRESSSSS: ', currentLocation.oldAddress)
  newCoords.value.lat = result.geometry.location.lat as any
  newCoords.value.lng = result.geometry.location.lng as any
}

const success = async (position: Position) => {
  console.log(currentLocation.latLng)
  const lat = currentLocation.latLng?.lat || position.coords.latitude
  const lng = currentLocation.latLng?.lng || position.coords.longitude

  console.log(`latitude: ${lat}, longitude: ${lng}`)
  currPos.value.lat = lat
  currPos.value.lng = lng

  console.log(currPos.value)

  if (mapRef.value == null) {
    return
  }

  map.value = new google.maps.Map(mapRef.value, {
    center: { lat, lng },
    zoom: 15
  })

  marker = new google.maps.Marker({
    position: { lat, lng },
    map: map.value
  })

  console.log('MARKER TYPE: ', typeof marker)
  console.log('MAP TYPE: ', typeof map.value)

  await fetchCurrentLocationAddress(currPos.value)

  console.log('MAP VALUE: ', map.value)

  setTimeout(() => {
    if (marker !== null) {
      marker.setMap(map.value)
    }
  })

  clickListener = map.value.addListener('click', async (e: google.maps.MapMouseEvent) => {
    console.log('e: ', e.latLng?.lat())
    otherPosRef.value = {
      lat: e.latLng?.lat() || currPos.value.lat,
      lng: e.latLng?.lng() || currPos.value.lng
    }
    isNotificationVisible.value = false
    currentLocation.setOldLocationAddress(currentLocation.address)
    currentLocation.setLocationLatLng({
      lat: otherPosRef.value.lat,
      lng: otherPosRef.value.lng
    })
    await fetchCurrentLocationAddress(otherPosRef.value)
  })

  clickListener = map.value.addListener('mousedown', async (e: google.maps.MapMouseEvent) => {
    console.log('e: ', e.latLng?.lat())
    otherPosRef.value = {
      lat: e.latLng?.lat() || currPos.value.lat,
      lng: e.latLng?.lng() || currPos.value.lng
    }
    isNotificationVisible.value = false
    currentLocation.setOldLocationAddress(currentLocation.address)
    currentLocation.setLocationLatLng({
      lat: otherPosRef.value.lat,
      lng: otherPosRef.value.lng
    })
    await fetchCurrentLocationAddress(otherPosRef.value)
  })
}

const error = (err: any) => {
  console.log(err)
}

onMounted(async () => {
  await loader.load()
  isDisabled.value = true
  navigator.geolocation.getCurrentPosition(success, error)
})

onUnmounted(() => {
  if (clickListener) clickListener.remove()
})

watch([map, currPos, otherPosRef], () => {
  // console.log("latlng: ", currentLocation.latLng);
  if (marker) marker.setMap(null)
  if (map.value && otherPosRef.value !== null) {
    marker = new google.maps.Marker({
      position: otherPosRef.value,
      map: map.value
    })

    isDisabled.value = false

    marker.setMap(map.value)
  }
})

const handleSubmit = () => {
  currentLocation.setLocationAddress(currentLocationRef.value)
  currentLocation.setLocationLatLng(newCoords.value)

  console.log('address: ', currentLocation.address)
  console.log('latlng: ', currentLocation.latLng)

  isDisabled.value = true
  isNotificationVisible.value = true
}

// watchEffect(() => {
//   console.log(currPos.value);
// });
</script>

<template>
  <Header />
  <main>
    <section class="ji gp uq">
      <div class="bb ye ki xn vq jb jo">
        <h1>Set Location</h1>
      <!-- Map placeholder -->
      <div ref="mapRef" class="bg-gray-400 w-full min-h-screen" />
        <div class="bottom-0 bg-white/50 w-full p-5 py-[2rem] flex flex-col">
          <div
            class="relative rounded-3xl w-full bg-white p-2.5 mb-[20px] inline-flex align-center gap-2 shadow-default-sm"
          >
            <va-icon name="location_on" class="text-primary" size="2rem" />
            <input
              type="text"
              placeholder="Current Location"
              class="w-full bg-transparent"
              :value="currentLocation.address"
            />
          </div>

          <generic-button
            bgColor="bg-primary"
            titleColor="text-white"
            class="w-full max-w-full hover:cursor-pointer"
            @click="handleSubmit"
            :disabled="isDisabled"
          >
            Set Location
          </generic-button>

          <span v-if="otherPosRef">
            Latitude: {{ newCoords.lat }}, Longitude:
            {{ newCoords.lng }}
          </span>
        </div>
      </div>

    </section>
  </main>
  <Footer />
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
