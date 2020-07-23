const wrapper = document.querySelector('.wrapper');
const empty = Array.from(document.querySelectorAll('.empty'));
const drag = document.querySelector('.drag');

drag.addEventListener('touchmove', touchMove);
drag.addEventListener('touchend', touchEnd);

// ------------------------ touchMove
function touchMove(event) {
    event.preventDefault();


    let touch = event.targetTouches[0];
    drag.style.top = `${touch.pageY - (wrapper.offsetTop) - (drag.offsetWidth / 2)}px`;
    drag.style.left = `${touch.pageX - (wrapper.offsetLeft) - (drag.offsetHeight / 2)}px`;
    drag.style.margin = '';
    drag.style.right = 'unset';
    drag.style.bottom = 'unset';
    drag.style.backgroundImage = 'url(../img/2.jpg)';

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
    drag.style.backgroundImage = 'url(../img/1.jpg)';
}

console.log(drag.getBoundingClientRect().right);
console.log(wrapper.getBoundingClientRect().right);