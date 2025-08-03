const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');
const actionLog = document.getElementById('actionLog');
let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCount = 1;
function formatTime(timeInMillis) {
    const date = new Date(timeInMillis);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = date.getUTCMilliseconds().toString().padStart(3, '0');
    
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString();
}
function logAction(action) {
    const logItem = document.createElement('li');
    logItem.textContent = `${getCurrentTime()} - ${action}`;
    actionLog.prepend(logItem);
}
function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}
function start() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(function() {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        isRunning = true;
        logAction("Started stopwatch");
    }
}
function pause() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        logAction("Paused stopwatch");
    }
}
function reset() {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    updateDisplay();
    lapsList.innerHTML = '';
    lapCount = 1;
    logAction("Reset stopwatch");
}
function lap() {
    if (isRunning) {
        const lapTime = document.createElement('li');
        lapTime.textContent = `Lap ${lapCount}: ${formatTime(elapsedTime)}`;
        lapsList.prepend(lapTime);
        logAction(`Recorded Lap ${lapCount}`);
        lapCount++;
    }
}
startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);