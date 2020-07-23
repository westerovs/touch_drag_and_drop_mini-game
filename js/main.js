const wrapper = document.querySelector('.wrapper');
const drag = document.querySelector('.drag');

let shiftX = null;
let shiftY = null;

drag.addEventListener('touchstart', touchStart);
drag.addEventListener('touchmove', touchMove);
drag.addEventListener('touchend', touchEnd);

// ------------------------ touchStart
function touchStart(event) {
    event.preventDefault();

    const touch = event.targetTouches[0];
    shiftX = touch.pageX - drag.getBoundingClientRect().left;
    shiftY = touch.pageY - drag.getBoundingClientRect().top;
}

// ------------------------ touchMove
function touchMove(event) {
    event.preventDefault();

    const touch = event.targetTouches[0];
    drag.style.top = `${touch.pageY - (wrapper.offsetTop) - (shiftY)}px`;
    drag.style.left = `${touch.pageX - (wrapper.offsetLeft) - (shiftX)}px`;
    drag.style.margin = '';
    drag.style.right = 'unset';
    drag.style.bottom = 'unset';
    drag.style.backgroundPosition = `-100px 0`;
    drag.style.boxShadow = `5px 5px 10px gray`;

    if (drag.getBoundingClientRect().top <= wrapper.getBoundingClientRect().top) {
        drag.style.top = `${0}px`;
    }
    if (drag.getBoundingClientRect().right >= wrapper.getBoundingClientRect().right) {
        drag.style.right = `${0}px`;
        drag.style.left = `unset`;
    }
    if (drag.getBoundingClientRect().bottom >= wrapper.getBoundingClientRect().bottom) {
        drag.style.top = `unset`;
        drag.style.bottom = `${0}px`;
    }
    if (drag.getBoundingClientRect().left <= wrapper.getBoundingClientRect().left) {
        drag.style.left = `${0}px`;
    }
}

function touchEnd(element) {
    drag.style.backgroundPosition = `0 0`;
    drag.style.boxShadow = `0 0 0 black`;
}
