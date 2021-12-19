const timerField = document.querySelector('.timer-content');
let startTimerValue = '00:05:00';
let timerIsEnd = false;

let timerIsStarted = false;
let timerIsPaused = false;
let timerIsReset = false;

let countdown;

const startTimerButton = document.querySelector('#start-timer');
const pauseTimerButton = document.querySelector('#pause-timer');
const resetTimerButton = document.querySelector('#reset-timer');

function setTimerValue() {
  timerField.innerHTML = startTimerValue;
  disableButton(pauseTimerButton);
  disableButton(resetTimerButton);
}

setTimerValue();

function getCurrentTimerValue() {
  return timerField.innerHTML;
}

function setCorrectValue(timerValue) {
  return timerValue < 10 ? '0' + timerValue : timerValue;
}

function updateTimer() {
  if (timerIsEnd) {
    setTimerValue();
    timerIsEnd = false;
  }

  let [ hours, minutes, seconds ] = getConvertedToNumberTimerValue();

  countdown = setInterval(() => {
    
    seconds--;
  
    if (seconds < 0) {
      // change to 59
      seconds = 59;
      minutes--;
    }
    
    if (minutes < 0 && hours != 0) {
      // change to 59
      minutes = 59;
      hours--;
    }
    
    let time = [hours, minutes, seconds];

    clearCountdown(time, countdown);

    timerField.innerHTML = `${setCorrectValue(hours)}:${setCorrectValue(minutes)}:${setCorrectValue(seconds)}`;
  }, 1000);
}

function getConvertedToNumberTimerValue() {
  let currentValue = getCurrentTimerValue();
  let convertedTimerValue = currentValue.split(':').map(value => parseInt(value));  
  return convertedTimerValue;
}

function disableButton(button) {
  button.disabled = true;
}

function enableButton(button) {
  button.disabled = false;
}

function timerManipulation() {
  function startTimer() {
    updateTimer();
    disableButton(startTimerButton);
    enableButton(pauseTimerButton);
    enableButton(resetTimerButton);
  }

  function pauseTimer() {
    clearInterval(countdown);
    enableButton(startTimerButton);
    disableButton(pauseTimerButton);
  }
  
  function resetTimer() {
    clearInterval(countdown);
    setTimerValue();
    enableButton(startTimerButton);
    disableButton(pauseTimerButton);
    disableButton(resetTimerButton);
  }

  startTimerButton.addEventListener('click', startTimer);
  pauseTimerButton.addEventListener('click', pauseTimer);
  resetTimerButton.addEventListener('click', resetTimer);
}

function equalFinalValueCheck(timeValue) {
  return timeValue.every(value => value === 0);
}

function clearCountdown(time, countdown) {
  if (equalFinalValueCheck(time)) {
    clearInterval(countdown);
    timerIsEnd = true;
    enableButton(startTimerButton);
    disableButton(pauseTimerButton);
    disableButton(resetTimerButton);
  }
}

timerManipulation();