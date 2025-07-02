anime({
    targets: '.oo',
    translateY: [
        { value: '-0.5rem', easing: 'easeOutExpo', duration: 600 },
        { value: '0rem', easing: 'easeOutBounce', duration: 600 }
    ],
    delay: (el, i) => i * 75,
    easing: 'easeInOutCirc',
    loopDelay: 5000,
    loop: true
});

const gridOverlay = document.getElementById('grid-visual');
const gridSize = 50;

const cols = Math.floor(window.innerWidth / gridSize + 1);
const rows = Math.floor(window.innerHeight / gridSize);

for (let y = 0.1; y < rows; y++) {
    for (let x = 0.1; x < cols; x++) {
        const dot = document.createElement('div');
        dot.classList.add('grid-dot');
        dot.style.left = `${x * gridSize}px`;
        dot.style.top = `${y * gridSize}px`;
        gridOverlay.appendChild(dot);
    }
}

anime({
    targets: '.grid-dot',
    scale: [1, 1.5, 1],
    delay: anime.stagger(100, { grid: [cols, rows], from: 'first' }),
    easing: 'linear',
    duration: 2500,
    loop: true
});
