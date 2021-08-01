const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minsElement = document.getElementById('mins');
const secondsElement = document.getElementById('seconds');
const newYears = '1 Jan 2022';

function countdown() {
    const newYearsDate = new Date(newYears);
    const currentDate = new Date();

    const totalSeconds = (newYearsDate - currentDate) / 1000;

    const days = Math.floor(totalSeconds / 60 / 60 / 24);
    const hours = Math.floor((totalSeconds - (days * 24 * 60 * 60)) / 60 / 60);
    const mins = Math.floor((totalSeconds - (days * 24 * 60 * 60) - (hours * 60 * 60)) / 60);
    const seconds = Math.floor(totalSeconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (mins * 60));
    console.log(days, hours, mins, seconds);

    daysElement.innerHTML = days;
    hoursElement.innerHTML = hours;
    minsElement.innerHTML = mins;
    secondsElement.innerHTML = seconds;
}

countdown();

setInterval(countdown, 1000);