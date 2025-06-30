let topZ = 1;

function makeCardDraggable(el, handle) {
    let offsetX, offsetY, isDragging = false;
    const gridSize = 50;
    const workspace = document.getElementById('workspace');
    let topZ = 1;

    handle.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - el.offsetLeft;
        offsetY = e.clientY - el.offsetTop;
        el.style.cursor = 'grabbing';
        topZ++;
        el.style.zIndex = topZ;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        el.style.left = `${e.clientX - offsetX}px`;
        el.style.top = `${e.clientY - offsetY}px`;
    });

    document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        el.style.cursor = 'grab';

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


function makeCardResizable(el) {
    const minWidth = 100;
    const minHeight = 100;
    let isResizingX = false;
    let isResizingY = false;
    let startX, startY, startWidth, startHeight;

    el.addEventListener('mousedown', (e) => {
        const rect = el.getBoundingClientRect();

        if (e.offsetX > rect.width - 10) {
            isResizingX = true;
            startX = e.clientX;
            startWidth = rect.width;
            e.preventDefault();
        }
        if (e.offsetY > rect.height - 10) {
            isResizingY = true;
            startY = e.clientY;
            startHeight = rect.height;
            e.preventDefault();
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (isResizingX) {
            const newWidth = Math.max(minWidth, startWidth + (e.clientX - startX));
            el.style.width = `${newWidth}px`;
        }
        if (isResizingY) {
            const newHeight = Math.max(minHeight, startHeight + (e.clientY - startY));
            el.style.height = `${newHeight}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isResizingX = false;
        isResizingY = false;
    });
}
