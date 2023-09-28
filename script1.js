var isRunning = false;
var isPaused = false;
var startTime = 0;
var elapsedTime = 0;
var lapTime = 0;
var intervalId;
var lapCounter = 1;

        const timeDisplay = document.querySelector('.time');
        const startPauseButton = document.getElementById('startPause');
        const lapResetButton = document.getElementById('lapReset');
        const lapList = document.querySelector('.lap-list');

        function updateDisplay() {
            const currentTime = Date.now() - startTime + elapsedTime;
            const hours = Math.floor(currentTime / 3600000);
            const minutes = Math.floor((currentTime % 3600000) / 60000);
            const seconds = Math.floor((currentTime % 60000) / 1000);

            timeDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }

        function toggleTimer() {
            if (isRunning && !isPaused) {  //pause event
                clearInterval(intervalId);
                startPauseButton.textContent = 'Resume';
                lapResetButton.textContent = 'Reset';
                isPaused = true;
                elapsedTime += Date.now() - startTime;
            } else if (isRunning && isPaused) {  //resume time event
                startTime = Date.now();
                intervalId = setInterval(updateDisplay, 1000);
                startPauseButton.textContent = 'Pause';
                lapResetButton.textContent = 'Lap';
                isPaused = false;
            } else {         //start time event
                startTime = Date.now() - (elapsedTime ? elapsedTime : 0);
                intervalId = setInterval(updateDisplay, 1000);
                startPauseButton.textContent = 'Pause';
                lapResetButton.textContent = 'Lap';
                isRunning = true;
            }
        }

        function lapOrReset() {
            if (isRunning && !isPaused) {
                const currentTime = Date.now() - startTime + elapsedTime;
                const currentHours = Math.floor(currentTime / 3600000);
                const currentMinutes = Math.floor((currentTime % 3600000) / 60000);
                const currentSeconds = Math.floor((currentTime % 60000) / 1000);

                const lapElapsed = currentTime - lapTime;
                const lapHours = Math.floor(lapElapsed / 3600000);
                const lapMinutes = Math.floor((lapElapsed % 3600000) / 60000);
                const lapSeconds = Math.floor((lapElapsed % 60000) / 1000);

                const lapItem = document.createElement('li');
                lapItem.textContent = `Lap ${lapCounter}:- +${String(lapHours).padStart(2, '0')}:${String(lapMinutes).padStart(2, '0')}:${String(lapSeconds).padStart(2, '0')}  - ${String(currentHours).padStart(2, '0')}:${String(currentMinutes).padStart(2, '0')}:${String(currentSeconds).padStart(2, '0')}`;
                lapList.appendChild(lapItem);
                lapTime = currentTime;
                lapCounter++;
            } else if ( isRunning && isPaused) {
                console.log("else if");
                clearInterval(intervalId);
                startTime = 0;  
                elapsedTime = 0;
                lapTime = 0;
                timeDisplay.textContent = '00:00:00';
                lapList.innerHTML = '';
                lapCounter = 1;
                startPauseButton.textContent = 'Start';
            }
        }

        startPauseButton.addEventListener('click', toggleTimer);
        lapResetButton.addEventListener('click', lapOrReset);