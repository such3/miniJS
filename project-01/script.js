"use strict";

// Notyf
const notyf = new Notyf();

// Declarations
let userHours = document.querySelector("#hours");
let userMinutes = document.querySelector("#minutes");
let userSeconds = document.querySelector("#seconds");
const startButton = document.querySelector("#start-timer");
const resetButton = document.querySelector("#reset-timer");
const setTimer = document.getElementById("set-time-layout");
const timerLayout = document.getElementById("visible-timer-layout");
const hoursTimer = document.getElementById("hours-timer");
const minutesTimer = document.getElementById("minutes-timer");
const secondsTimer = document.getElementById("seconds-timer");

let timerStatus = false;
let countdownInterval;

// Event Listeners
startButton.addEventListener("click", function (e) {
  e.preventDefault();

  if (timerStatus === false) {
    let hours = Number(userHours.value);
    let minutes = Number(userMinutes.value);
    let seconds = Number(userSeconds.value);

    const invalidTime = hours === 0 && seconds === 0 && minutes === 0;
    if (!invalidTime) {
      startTimer(hours, minutes, seconds);
    } else {
      notyf.error("Invalid Duration");
    }
  }
});

resetButton.addEventListener("click", function () {
  clearInterval(countdownInterval);
  resetTimer();
});

const startTimer = (hours, minutes, seconds) => {
  // Convert the time into total seconds
  let totalSeconds = seconds + minutes * 60 + hours * 3600;

  // Hide set time layout and show visible timer layout
  setTimer.classList.add("hidden");
  timerLayout.classList.remove("hidden");

  timerStatus = true;

  // Define the interval that updates every second
  countdownInterval = setInterval(() => {
    if (totalSeconds <= 0) {
      clearInterval(countdownInterval);
      notyf.success("Timer Completed");
      resetTimer();
    } else {
      totalSeconds--;

      let displayHours = Math.floor(totalSeconds / 3600);
      let displayMinutes = Math.floor((totalSeconds % 3600) / 60);
      let displaySeconds = totalSeconds % 60;

      // Update the visible timer display
      hoursTimer.textContent = displayHours.toString().padStart(2, "0");
      minutesTimer.textContent = displayMinutes.toString().padStart(2, "0");
      secondsTimer.textContent = displaySeconds.toString().padStart(2, "0");
    }
  }, 1000);
};

const resetTimer = () => {
  // Reset form fields and timer status
  userHours.value = "";
  userMinutes.value = "";
  userSeconds.value = "";

  // Reset timer display
  hoursTimer.textContent = "00";
  minutesTimer.textContent = "00";
  secondsTimer.textContent = "00";

  // Show set time layout and hide visible timer layout
  setTimer.classList.remove("hidden");
  timerLayout.classList.add("hidden");

  timerStatus = false;
};
