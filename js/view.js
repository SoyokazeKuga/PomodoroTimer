// eslint-disable-next-line no-unused-vars
function addMusicLengthRow() {

    const tbody = document.getElementById("inputMusicLengths");

    const tr = document.createElement("tr");
    const indexTd = document.createElement("td");
    indexTd.innerHTML = "1st: ";
    const inputTd = document.createElement("td");
    inputTd.innerHTML = '<input type="number" value="25" class="musicSessionLengths">分'

    tbody.appendChild(tr);
    tr.appendChild(indexTd);
    tr.appendChild(inputTd);
}