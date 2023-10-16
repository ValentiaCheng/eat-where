import { createClient, type RealtimeChannel } from "@supabase/supabase-js";
import { ref, type Ref } from "vue";
import { useCurrentLocationStore } from "@/stores/currentLocation";
import { useGroupUpvoteRestaurantsStore } from "@/stores/groupUpvoteRestaurants";
import type { TrackData } from "@/types/supabase";
import router from "@/router/index";
import type { Restaurant } from "@/types/Restaurant";
import { useTimer } from "@/composables/useTimer";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY,
  {
    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
  },
);

const channel: Ref<RealtimeChannel | null> = ref(null);
const currUser = ref("");
const users = ref(new Set<string>());
const isLeader = ref(false);
const { milliseconds, killTimers } = useTimer();

const openOrCreateChannel = (channelName: string, username: string) => {
  users.value.clear();
  const currChannel = supabase.channel(channelName, {
    config: {
      presence: {
        key: username,
      },
    },
  });
  currChannel.on("presence", { event: "sync" }, () => {
    console.log("Online users: ", currChannel.presenceState());
    if (!isLeader.value) {
      const channelState = currChannel.presenceState();
      for (const [userKey, data] of Object.entries(channelState)) {
        const userData = data[0] as any;
        if (userData.location) {
          const locationStore = useCurrentLocationStore();
          locationStore.setLocationLatLng(userData.location);

          locationStore.setLocationAddress(userData.address);
        }
      }
    }
  });

  currChannel.on("presence", { event: "join" }, ({ key, newPresences }) => {
    console.log(
      `New users have joined: ${key} | ${JSON.stringify(newPresences)}`,
    );
    users.value.add(key);
  });

  currChannel.on("broadcast", { event: "upvote" }, (payload) => {
    const groupUpvoteRestaurantsStore = useGroupUpvoteRestaurantsStore();
    groupUpvoteRestaurantsStore.addRestaurant(payload.payload as Restaurant);
  });

  currChannel.on("broadcast", { event: "downvote" }, (payload) => {
    const groupUpvoteRestaurantsStore = useGroupUpvoteRestaurantsStore();
    groupUpvoteRestaurantsStore.removeRestaurant(payload.payload as string);
  });

  currChannel.on("broadcast", { event: "start" }, (payload) => {
    if (!isLeader.value) {
      milliseconds.value = payload.payload.time;
    }
    router.push("/vote");
  });

  currChannel.on("broadcast", { event: "endVote" }, () => {
    killTimers();
    router.push("/results");
  });

  currChannel.on("presence", { event: "leave" }, ({ key, leftPresences }) => {
    console.log(`Users have left: ${key} | ${JSON.stringify(leftPresences)}`);
    users.value.delete(key);
  });
  channel.value = currChannel.subscribe(async (status) => {
    if (status === "SUBSCRIBED") {
      const trackObject: TrackData = {
        upvoted: [],
      };
      if (isLeader.value) {
        const locationStore = useCurrentLocationStore();
        if (locationStore.latLng) trackObject.location = locationStore.latLng;
        if (locationStore.address) trackObject.address = locationStore.address;
        console.log(trackObject);
      }

      await currChannel.track(trackObject);
    }
  });
};

export { users, currUser, channel, isLeader, openOrCreateChannel };
