import {ch2faff, ch2nato} from "./fonetic.js";
import {generate_log_cabrillo} from "./log_cabrillo.js";

/** Method for updating log entries */
export const refreshLogsTable = function () {
    document.getElementById('log').innerHTML = '';

    let nr = 0;
    let _qsos = [];

    const genQSORecords = function (j) {
        let row = document.createElement('div');
        row.className = "logRow"

        /* check for duplicates */
        _qsos.push([j[6],j[1],j[0]]);
        for (let i = 0; i < _qsos.length-1; i++) {
            if (_qsos[i][0] === j[6]) {
                if (_qsos[i][1] === j[1]) {
                    if (_qsos[i][2] === j[0])
                        row.className = "logRow logRowDuplicate";
                } else {
                    let a_q = Math.floor(j[1]/100);
                    let b_q = Math.floor(_qsos[i][1] / 100);
                    let a_m = j[1] % 100;
                    let b_m = _qsos[i][1] % 100;
                    if (a_q === b_q) {
                        if (a_m >= 30 && b_m >=30) {
                            if (_qsos[i][2] === j[0])
                                row.className = "logRow logRowDuplicate";
                        }
                        else if (a_m < 30 && b_m < 30) {
                            if (_qsos[i][2] === j[0])
                                row.className = "logRow logRowDuplicate";
                        }
                    }
                }
            }
        }

        /* Add row numbers */
        nr+=1;
        let nrc = document.createElement('div');
        nrc.style = 'display:none';
        nrc.innerHTML = nr;
        row.appendChild(nrc);

        for (let i of [4,1,5,7,6,3]) {
            let cell = document.createElement('div');
            if (i === 4 || i === 9) {
                cell.innerHTML = leadingZeros(parseInt(j[i]),2)
            } else {
                cell.innerHTML = j[i];
            }
            row.appendChild(cell);
        }
        let cell = document.createElement('div');

        let editBut = document.createElement('button');
        editBut.innerHTML = '&#9998;';
        editBut.classList.add("short","green");
        editBut.addEventListener('click', editLog);
        cell.appendChild(editBut);

        let delBut = document.createElement('button');
        delBut.innerHTML = '&cross;';
        delBut.classList.add("short","red");
        delBut.addEventListener('click', clearLog);
        cell.appendChild(delBut);


        row.appendChild(cell);
        document.getElementById('log').appendChild(row);
    };
    const QSORecords = JSON.parse(localStorage['QSORecords'] || "[]");
    QSORecords.forEach(x => genQSORecords(x));
}

export const updatePage = function () {

    let loc = '';

    /** Update my callsign value */
    for (let i = 0; i < localStorage['PCall'].length; i++) {
        loc = loc.concat((i === 0) ? '' : ' ', (localStorage['finnish_fonetics'] == 1) ? ch2faff(localStorage['PCall'].toLowerCase().charAt(i)) : ch2nato(localStorage['PCall'].toLowerCase().charAt(i)) )
    }
    document.getElementById('my_callsign').innerHTML = localStorage['PCall'].toUpperCase();
    document.getElementById('my_callsign_fonetic').innerHTML = loc;

    /** Update my send number */
    document.getElementById('my_next_number').innerHTML = document.getElementById('Tenure').value + ' ' + document.getElementById('Age').value + ' ' + leadingZeros(next_tx_number(), 2);

    /** Update my points value */
    document.getElementById('my_points').innerHTML = 0;

    /** Generate log in Cabrillo format */
    generate_log_cabrillo();
};

/** Method to mark missing input */
const markInputs = function() {
    document.querySelectorAll('.missing').forEach(x => x.classList.remove('missing'));
    if (0 < document.getElementById('qso_time').value.length && document.getElementById('qso_time').value.length < 4) document.getElementById('qso_time').classList.add('missing');
    if (document.getElementById('qso_rx_callsign').value.length === 0) document.getElementById('qso_rx_callsign').classList.add('missing');
    if (document.getElementById('qso_tx_rst').value.length === 0) document.getElementById('qso_tx_rst').classList.add('missing');
    if (document.getElementById('qso_rx_number').value.length === 0) document.getElementById('qso_rx_number').classList.add('missing');
    if (document.getElementById('qso_rx_rst').value.length === 0) document.getElementById('qso_rx_rst').classList.add('missing');
}

/** Method for adding log entries */
const addLog = function () {
    const QSORecords = JSON.parse(localStorage['QSORecords'] || "[]");

    if (document.getElementById('qso_time').value.length <= 0) {
        let ct = new Date();
        document.getElementById('qso_time').value = ct.toTimeString().match(/\d\d:\d\d/).toString().replace(/[^0-9]/g, '');
    } else {
        document.getElementById('qso_time').value = document.getElementById('qso_time').value.replace(/[^0-9]/g, '').substring(0,4);
    }

    markInputs();

    if (
        document.getElementById('qso_time').value.length === 4 &&
        document.getElementById('qso_rx_callsign').value.length > 0 &&
        document.getElementById('qso_tx_rst').value.length > 0 &&
        document.getElementById('qso_rx_number').value.length > 0 &&
        document.getElementById('qso_rx_rst').value.length > 0
    ) {
        if (document.getElementById('qso_edit').value != 0) {
            let e = document.getElementById('qso_edit').value;
            QSORecords[e-1] = [
                'CW',
                document.getElementById('qso_time').value.replace(/[^0-9]/g, ''),
                document.getElementById('PCall').value.toUpperCase(),
                document.getElementById('qso_rx_rst').value,
                leadingZeros(document.getElementById('qso_tx_number').value,2),
                document.getElementById('qso_rx_callsign').value.toUpperCase(),
                document.getElementById('qso_tx_rst').value,
                leadingZeros(document.getElementById('qso_rx_number').value,2)
            ];
        } else {
            QSORecords.push([
                'CW',
                document.getElementById('qso_time').value.replace(/[^0-9]/g, ''),
                document.getElementById('PCall').value.toUpperCase(),
                document.getElementById('qso_rx_rst').value,
                leadingZeros(next_tx_number(),2),
                document.getElementById('qso_rx_callsign').value.toUpperCase(),
                document.getElementById('qso_tx_rst').value,
                leadingZeros(document.getElementById('qso_rx_number').value,2)
            ]);
            localStorage['my_next_number'] = next_tx_number();
        }
        localStorage['QSORecords'] = JSON.stringify(QSORecords);

        /* Reset form values */
        document.getElementById('qso_edit').value = 0;
        document.getElementById('qso_tx_number').value = next_tx_number();
        document.getElementById('qso_time').value = '';
        document.getElementById('qso_rx_callsign').value = '';
        document.getElementById('qso_rx_number').value = '';
        document.getElementById('qso_rx_callsign').focus();
    }

    refreshLogsTable();
    updatePage();
}

const next_tx_number = function () {
    let i = (localStorage['my_next_number']) ? parseInt(localStorage['my_next_number']) : 1;
    return i+1;
}

const leadingZeros = function (num,places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
}

/** Method to edit a log entry */
const editLog = function(e) {
    let d = e.target.parentNode.parentNode.children;
    document.getElementById('qso_edit').value = d[0].textContent;
    document.getElementById('qso_tx_number').value = d[1].textContent;
    document.getElementById('qso_time').value = d[2].textContent;
    document.getElementById('qso_rx_callsign').value = d[3].textContent;
    document.getElementById('qso_rx_number').value = d[4].textContent;
    document.getElementById('qso_tx_rst').value = d[6].textContent;
    document.getElementById('qso_rx_rst').value = d[7].textContent;
}

/** Method to clear a log entry */
const clearLog = function (e) {
    const QSORecords = JSON.parse(localStorage['QSORecords'] || "[]");
    let d = e.target.parentNode.parentNode.firstChild.textContent;
    QSORecords.splice(d-1, 1);
    localStorage['QSORecords'] = JSON.stringify(QSORecords);
    refreshLogsTable();
    updatePage();
}

/** Method to clear all logs */
const clearLogs = function () {
    let r = confirm("Do you really want to clear the log?");
    if (r === true) {
        localStorage['my_next_number'] = 0;
        localStorage['QSORecords'] = JSON.stringify([]);
        refreshLogsTable();
        updatePage();
    }
}

/** Log input enter magic */
document.getElementById('qso_time').addEventListener("keydown", function (event) {
    if ((event.key === 'Enter')||(event.key === 'Tab')) {
        event.preventDefault();
        if (this.value.length > 0) {
            this.classList.remove('missing');
        } else {
            let ct = new Date();
            document.getElementById('qso_time').value = ct.toTimeString().match(/\d\d:\d\d/).toString().replace(/:/g, '').replace(/\./g, '');
        }
        document.getElementById("qso_rx_callsign").focus();
    }
});

document.getElementById('qso_rx_callsign').addEventListener("keydown", function (event) {
    if (this.value.length > 0) this.classList.remove('missing');
    if (event.key === 'Enter') {
        event.preventDefault();
        if (this.value.length > 0) document.getElementById("qso_rx_number").focus();
    }
});

document.getElementById('qso_rx_number').addEventListener("keydown", function (event) {
    if (this.value.length > 0) this.classList.remove('missing');
    if (event.key === 'Enter') {
        event.preventDefault();
        if (this.value.length > 0) document.getElementById("qso_tx_rst").focus();
    }
});

document.getElementById('qso_tx_rst').addEventListener("keydown", function (event) {
    if ((event.key === 'Enter')||(event.key === 'Tab')) {
        event.preventDefault();
        if (this.value.length === 0) {
            this.value = '599';
            this.classList.remove('missing');
        }
        document.getElementById("qso_rx_rst").focus();
    }
});

document.getElementById('qso_rx_rst').addEventListener("keydown", function (event) {
    if ((event.key === 'Enter')||(event.key === 'Tab')) {
        event.preventDefault();
        if (this.value.length === 0) this.value = '599';
        addLog();
    }
});

/** Add and Clear Logs */
document.getElementById('log_reset').addEventListener('click', clearLogs);
document.getElementById('qso_write').addEventListener('click', addLog);