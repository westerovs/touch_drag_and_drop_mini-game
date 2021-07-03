document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.querySelector('.wrapper')
    const drag    = wrapper.querySelector('.drag')
    const start   = wrapper.querySelector('.start-screen')

    const offsetTouch = {
        x: null,
        y: null
    }

    const voices = {
        sayStart: new Audio('./say-play.mp3'),
        sayStop: new Audio('./say-stop.mp3'),
        sayNo: new Audio(`./say-no.mp3`),
    }
    
    const touchStart = (event) => {
        const touch = event.targetTouches[0]
        offsetTouch.x = touch.pageX - drag.getBoundingClientRect().left
        offsetTouch.y = touch.pageY - drag.getBoundingClientRect().top
    
        drag.classList.add('drag-start')
        voices.sayStart.play()
    }

    const touchMove = (event) => {
        const touch = event.targetTouches[0]
        drag.style.top  = `${ touch.pageY - (wrapper.offsetTop)  - (offsetTouch.y) }px`
        drag.style.left = `${ touch.pageX - (wrapper.offsetLeft) - (offsetTouch.x) }px`

        if (drag.getBoundingClientRect().top <= wrapper.getBoundingClientRect().top) {
            drag.style.top = `${ 0 }px`
            voices.sayNo.play()
        }
        if (drag.getBoundingClientRect().right >= wrapper.getBoundingClientRect().right) {
            drag.style.right = `${ 0 }px`
            drag.style.left  = `unset`
            voices.sayNo.play()
        }
        if (drag.getBoundingClientRect().bottom >= wrapper.getBoundingClientRect().bottom) {
            drag.style.top = `unset`
            drag.style.bottom = `${ 0 }px`
            voices.sayNo.play()
        }
        if (drag.getBoundingClientRect().left <= wrapper.getBoundingClientRect().left) {
            drag.style.left = `${ 0 }px`
            voices.sayNo.play()
        }
    }

    const touchEnd = () => {
        drag.classList.remove('drag-start')
        voices.sayStop.play()
    }
    
    const init = () => {
        start.addEventListener('touchstart', () => {
            start.classList.add('start-screen--hidden')
        }, { once: true })
    
        drag.addEventListener('touchstart', touchStart)
        drag.addEventListener('touchmove', touchMove)
        drag.addEventListener('touchend', touchEnd)
    }
    
    init()
})
