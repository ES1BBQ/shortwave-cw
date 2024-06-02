import { updatePage } from "./logs.js";

/** Methods to store and restore field values for EDI header */
const inputSaveAndRestore = function (e) {
    if (localStorage[e.id]) e.value = localStorage[e.id];
    e.addEventListener('input', function () {
        localStorage[e.id] = e.value;
        updatePage();
    });
};
const selectSaveAndRestore = function (e) {
    e.addEventListener('change', function () {
        localStorage[e.id] = e.value;
        updatePage();
    });
    if (localStorage[e.id]) {
        let opts = e.options;
        for (let opt, j = 0; opt = opts[j]; j++) {
            if (opt.value === localStorage[e.id]) {
                e.selectedIndex = j;
                break;
            }
        }
    }
};
const checkboxSaveAndRestore = function (e) {
    if (localStorage[e.id] && (localStorage[e.id] == 1)) e.checked = true;
    e.addEventListener('change', function () {
        if(e.checked){
            localStorage[e.id] = 1;
        } else {
            localStorage[e.id] = 0;
        }
        updatePage();
    });
};

/** Run all the scrips */
document.querySelectorAll('#settings input:not([type="checkbox"])').forEach(x => inputSaveAndRestore(x));
document.querySelectorAll('#settings select').forEach(x => selectSaveAndRestore(x));
document.querySelectorAll('.contest select').forEach(x => selectSaveAndRestore(x));
document.querySelectorAll('input[type="checkbox"]').forEach(x => checkboxSaveAndRestore(x));