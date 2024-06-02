const tabify = function (e) {
    const header = e.querySelector('.tabs-header');
    const content = e.querySelector('.tabs');
    const tab_headers = [...header.children];
    const tab_contents = [...content.children];
    tab_contents.forEach(x => x.style.display = 'none');
    let current_tab_index = -1;

    function setTab(index) {
        if (current_tab_index > -1) {
            tab_headers[current_tab_index].classList.remove('active');
            tab_contents[current_tab_index].style.display = 'none';
        }
        tab_headers[index].classList.add('active');
        tab_contents[index].style.display = '';
        current_tab_index = index;
    }

    let default_tab_index = tab_headers.findIndex(x => {
        return [...x.classList].indexOf('default-tab') > -1;
    });

    default_tab_index = default_tab_index === -1 ? 0 : default_tab_index;
    setTab(default_tab_index);
    tab_headers.forEach((x, i) => x.onclick = () => setTab(i));
};

/** create tabs */
document.querySelectorAll('.tabs-container').forEach(x => tabify(x));