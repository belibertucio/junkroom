anime({
    targets: '.colored',
    translateY: [
        { value: '-0.5rem', easing: 'easeOutExpo', duration: 600 },
        { value: '0rem', easing: 'easeOutBounce', duration: 600 }
    ],
    delay: (el, i) => i * 75,
    easing: 'easeInOutCirc',
    loopDelay: 5000,
    loop: true
});

