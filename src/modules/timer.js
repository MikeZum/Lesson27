const timer = (deadline) => {
    const timerHours = document.getElementById('timer-hours');
    const timerMinutes = document.getElementById('timer-minutes');
    const timerSeconds = document.getElementById('timer-seconds');
    let interval;

    const getTimeRemaining = () => {
        let dateStop = new Date(deadline).getTime();
        let dateNow = new Date().getTime();
        let timeRemaining = (dateStop - dateNow) / 1000;
        let hours = Math.floor(timeRemaining / 60 / 60);
        let minutes = Math.floor((timeRemaining / 60) % 60);
        let seconds = Math.floor(timeRemaining % 60);

        return { timeRemaining, hours, minutes, seconds };
    };

    function zeroPlus(item) {
        let num = item < 10 ? '0' + item : item;
        return num;
    }

    const updateClock = () => {
        let getTime = getTimeRemaining();

        if (getTime.timeRemaining > 0) {
            timerHours.textContent = zeroPlus(getTime.hours);
            timerMinutes.textContent = zeroPlus(getTime.minutes);
            timerSeconds.textContent = zeroPlus(getTime.seconds);
        } else {
            timerHours.textContent = '00';
            timerMinutes.textContent = '00';
            timerSeconds.textContent = '00';
            clearInterval(interval);
        }
    };
    interval = setInterval(updateClock, 1000);
};

export default timer;