import { ref, type Ref } from "vue";
import { defineStore } from "pinia";
import dayjs from "dayjs";

export const useTimerStore = defineStore("timer", () => {
  const dayJsData: Ref<dayjs.Dayjs> = ref(dayjs());
  const displayTime = ref("00:00");

  function minusSecond() {
    const totalSeconds =
      dayJsData.value.minute() * 60 + dayJsData.value.second();
    if (totalSeconds > 0) {
      dayJsData.value = dayJsData.value?.subtract(1, "second");
      displayTime.value = dayJsData.value.format("mm:ss");
    }
  }
  function initdayJsData(minute: number, second: number) {
    dayJsData.value = dayJsData.value
      .set("minute", minute)
      .set("second", second);
  }

  return {
    displayTime,
    dayJsData,
    minusSecond,
    initdayJsData,
  };
});
