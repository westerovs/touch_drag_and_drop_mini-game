/* eslint-disable no-use-before-define */
document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.querySelector('.wrapper');
    const drag = document.querySelector('.drag');
    const start = document.querySelector('.start');

    let play = false;
    let sayNoo = null;
    let offsetTouchX = null;
    let offsetTouchY = null;
    const sayOxx = new Audio('./play.mp3');
    const sayShlep = new Audio('./stop.mp3');

    // ------------------------ listeners
    start.addEventListener('touchstart', () => {
        start.style.opacity = 0;
        start.style.zIndex = -1;
        drag.style.opacity = 1;
    });

    drag.addEventListener('touchstart', touchStart);
    drag.addEventListener('touchmove', touchMove);
    drag.addEventListener('touchend', touchEnd);

    // ------------------------ touchStart
    function touchStart(event) {
        event.preventDefault();

        if (!play) {
            play = true;
            sayNoo = new Audio(`./${randomNumber(1, 9)}.mp3`);
            sayOxx.play();
        }

        const touch = event.targetTouches[0];
        offsetTouchX = touch.pageX - drag.getBoundingClientRect().left;
        offsetTouchY = touch.pageY - drag.getBoundingClientRect().top;

        drag.style.backgroundPosition = `-100px 0`;
        drag.style.boxShadow = `5px 5px 10px gray`;
    }

    // ------------------------ touchMove
    function touchMove(event) {
        event.preventDefault();

        const touch = event.targetTouches[0];
        drag.style.top = `${touch.pageY - (wrapper.offsetTop) - (offsetTouchY)}px`;
        drag.style.left = `${touch.pageX - (wrapper.offsetLeft) - (offsetTouchX)}px`;
        drag.style.backgroundPosition = `-100px 0`;

        if (drag.getBoundingClientRect().top <= wrapper.getBoundingClientRect().top) {
            drag.style.top = `${0}px`;
            sayNoo.play();
            drag.style.backgroundPosition = `-202px -3px`;
        }
        if (drag.getBoundingClientRect().right >= wrapper.getBoundingClientRect().right) {
            drag.style.right = `${0}px`;
            drag.style.left = ``;
            drag.style.backgroundPosition = `-202px -3px`;
            sayNoo.play();
        }
        if (drag.getBoundingClientRect().bottom >= wrapper.getBoundingClientRect().bottom) {
            drag.style.top = ``;
            drag.style.bottom = `${0}px`;
            drag.style.backgroundPosition = `-202px -3px`;
            sayNoo.play();
        }
        if (drag.getBoundingClientRect().left <= wrapper.getBoundingClientRect().left) {
            drag.style.left = `${0}px`;
            sayNoo.play();
            drag.style.backgroundPosition = `-202px -3px`;
        }
    }

    function touchEnd() {
        drag.style.backgroundPosition = `0 0`;
        drag.style.boxShadow = `0 0 0 black`;

        play = false;
        sayShlep.play();
    }

    function randomNumber(min = 1, max = 9) {
        return Math.floor(Math.random() * (max - min) + min);
    }
});
