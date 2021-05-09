import { ref } from "vue";

export function useTimer() {
  let minutes = ref(0);
  let seconds = ref(0);
  let timer;
  //   let countDownDate = new Date(2021, 2, 15, 23, 1).getTime(); define specific date and time
  let countDownDate = new Date();
  countDownDate.setMinutes(countDownDate.getMinutes() + 1);
  const startTimer = () => {
    timer = setInterval(() => {
      let now = new Date().getTime();
      let distance = countDownDate - now;
      minutes.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      seconds.value = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(timer);
      }
    }, 1000);
  };
  const clearTimer = () => clearInterval(timer);

  return { minutes, seconds, clearTimer, startTimer };
}
