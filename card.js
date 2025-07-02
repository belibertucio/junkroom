let topZ = 1;

function makeCardDraggable(el, handle) {
    let offsetX, offsetY, isDragging = false;
    const gridSize = 50;
    const workspace = document.getElementById('workspace');

    handle.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - el.offsetLeft;
        offsetY = e.clientY - el.offsetTop;
        handle.style.cursor = 'grabbing';

        const cards = document.querySelectorAll('.card');
        let maxZ = 0;

        cards.forEach(card => {
            const z = parseInt(card.style.zIndex) || 0;
            if (z > maxZ) maxZ = z;
        });

        el.style.zIndex = maxZ + 1;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        el.style.left = `${e.clientX - offsetX}px`;
        el.style.top = `${e.clientY - offsetY}px`;
    });

    document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        handle.style.cursor = 'grab';

        const workspaceRect = workspace.getBoundingClientRect();
        const maxX = workspace.clientWidth - el.offsetWidth;
        const maxY = workspace.clientHeight - el.offsetHeight;

        let snappedX = Math.round(el.offsetLeft / gridSize) * gridSize;
        let snappedY = Math.round(el.offsetTop / gridSize) * gridSize;

        if (snappedX < 0) snappedX = 0;
        if (snappedY < 0) snappedY = 0;
        if (snappedX > maxX) snappedX = maxX;
        if (snappedY > maxY) snappedY = maxY;

        anime({
            targets: el,
            left: snappedX,
            top: snappedY,
            duration: 300,
            easing: 'easeOutElastic(1, .5)'
        });
    });
}


function makeCardResizable(card) {
    const gridSize = 25;

    card.addEventListener('mousedown', (e) => {
        const isBottom = e.target === card && e.offsetY > card.clientHeight - 10;
        const isRight = e.target === card && e.offsetX > card.clientWidth - 10;

        if (!isBottom && !isRight) return;

        let startX = e.clientX;
        let startY = e.clientY;
        let startWidth = card.offsetWidth;
        let startHeight = card.offsetHeight;

        const resizeBoth = isBottom && isRight;

        function onMouseMove(ev) {
            let newWidth = startWidth;
            let newHeight = startHeight;

            if (isRight || resizeBoth) {
                newWidth = startWidth + (ev.clientX - startX);
                newWidth = Math.max(100, Math.round(newWidth / gridSize) * gridSize);
            }

            if (isBottom || resizeBoth) {
                newHeight = startHeight + (ev.clientY - startY);
                newHeight = Math.max(100, Math.round(newHeight / gridSize) * gridSize);
            }

            anime({
                targets: card,
                width: newWidth,
                height: newHeight,
                duration: 25,
                easing: 'easeOutSine'
            });
        }

        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        e.stopPropagation();
    });
}
