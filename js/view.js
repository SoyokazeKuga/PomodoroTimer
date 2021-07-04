// eslint-disable-next-line no-unused-vars
window.pomodoroAddMusicLengthRow = () => {

    const tbody = document.getElementById("inputMusicLengths");

    const tr = document.createElement("tr");
    const indexTd = document.createElement("td");
    indexTd.innerHTML = ": ";
    const inputTd = document.createElement("td");
    inputTd.innerHTML = '<input type="number" value="25" class="musicSessionLengths">分'

    tbody.appendChild(tr);
    tr.appendChild(indexTd);
    tr.appendChild(inputTd);
}

window.pomodoroUpdateTimerView = () => {
    // 時間を受け取る処理

    let remainingTime = document.getElementById('remaningTime');
    remainingTime.innerHTML = window.syykzPomodoro.getRemainingTimeForView();
}

setInterval(window.pomodoroUpdateTimerView, 250);