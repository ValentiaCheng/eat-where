import { computed, ref, type Ref } from "vue";
import { useIntervalFn, useTimeoutFn } from "@vueuse/core";
import { channel, isLeader } from "@/apis/supabase";
import router from "@/router";
import { useTimerStore } from "@/stores/timer";

const pendingTimer = ref(false);
const killEndVoteTimer = ref(() => {});
const killDisplayTimeTimer = ref(() => {});
const milliseconds = ref(60000);

export function useTimer() {
  const init = () => {
    const { minusSecond, dayJsData, initdayJsData } = useTimerStore();
    if (!pendingTimer.value) {
      let seconds = Math.floor(milliseconds.value / 1000);
      let minutes = Math.floor(seconds / 60);

      seconds = seconds % 60;
      minutes = minutes % 60;
      initdayJsData(minutes, seconds);
      // displayTime.value = dayJsData.value.format("mm:ss");

      const { stop: endVoteStop } = useTimeoutFn(async () => {
        try {
          if (isLeader.value) {
            await channel.value?.send({
              type: "broadcast",
              event: "endVote",
            });
            router.push("/results");
          }
        } catch (error) {
          console.log(error);
        }
      }, milliseconds.value);

      const { pause } = useIntervalFn(() => {
        minusSecond();
      }, 1000);

      killEndVoteTimer.value = endVoteStop;
      killDisplayTimeTimer.value = pause;
      pendingTimer.value = true;
    } else {
      const millisecondsToTimeout =
        dayJsData.minute() * 1000 * 60 + dayJsData.second() * 1000;
      const { stop: endVoteStop } = useTimeoutFn(async () => {
        try {
          if (isLeader.value) {
            await channel.value?.send({
              type: "broadcast",
              event: "endVote",
            });
            router.push("/results");
          }
        } catch (error) {
          console.log(error);
        }
      }, millisecondsToTimeout);
      const { pause } = useIntervalFn(() => {
        minusSecond();
      }, 1000);
    }
  };

  const killTimers = () => {
    killEndVoteTimer.value();
    killDisplayTimeTimer.value();
    pendingTimer.value = false;
  };

  return { milliseconds, killTimers, init };
}
