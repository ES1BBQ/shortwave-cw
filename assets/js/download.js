/* Experimental feature: Allow downloading of log */
const downloadCabrillo = function() {
    let date = (localStorage['TDate'] && localStorage['TDate'].length > 0) ? ''.concat('_',localStorage['TDate'].replace(/-/g, '')) : '';
    let call = (localStorage['PCall'] && localStorage['PCall'].length > 0) ? ''.concat('_',localStorage['PCall'].toLowerCase()) : '';
    let filename = ''.concat('es_ll_fieldday_log',call,date,'.txt')
    this.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent( document.getElementById('log_cabrillo').value ));
    this.setAttribute('download', filename);
};

document.getElementById('downloadCabrillo').addEventListener("click", downloadCabrillo);