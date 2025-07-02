const addCardBtn = document.getElementById('add-card-button');

function setupPlaceholderWatcher(el) {
    el.addEventListener('input', () => {
        if (el.innerText.trim() === '') {
            el.innerHTML = '';
            el.style.opacity = '0.75';
        } else {
            el.style.opacity = '1';
        }
    });
}

addCardBtn.addEventListener('click', () => {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');

    const titleSpan = document.createElement('div');
    titleSpan.classList.add('card-title');
    titleSpan.contentEditable = true;
    titleSpan.dataset.placeholder = 'Title';
    titleSpan.style.opacity = '0.75';
    setupPlaceholderWatcher(titleSpan);

    const dragArea = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    dragArea.classList.add('card-drag-area');
    dragArea.setAttribute("viewBox", "0 0 448 512");
    dragArea.innerHTML = `<path fill="currentColor" d="M32 288c-17.7 0-32 14.3-32 32s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zm0-128c-17.7 0-32 14.3-32 32s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32H32z"/>`;

    cardHeader.appendChild(titleSpan);
    cardHeader.appendChild(dragArea);

    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');
    cardContent.contentEditable = true;
    cardContent.dataset.placeholder = 'Insert Text...';
    cardContent.style.opacity = '0.75';
    setupPlaceholderWatcher(cardContent);

    card.appendChild(cardHeader);
    card.appendChild(cardContent);

    card.style.left = '100px';
    card.style.top = '100px';
    document.getElementById('workspace').appendChild(card);

    const cards = document.querySelectorAll('.card');
    let maxZ = 0;

    cards.forEach(card => {
        const z = parseInt(card.style.zIndex) || 0;
        if (z > maxZ) maxZ = z;
    });

    card.style.zIndex = maxZ + 1;

    makeCardDraggable(card, dragArea);
    makeCardResizable(card);
});

document.addEventListener('paste', (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');

    if (document.activeElement.isContentEditable) {
        document.execCommand('insertText', false, text);
    }

    if (document.activeElement.tagName === 'TEXTAREA' || document.activeElement.tagName === 'INPUT') {
        const start = document.activeElement.selectionStart;
        const end = document.activeElement.selectionEnd;
        const value = document.activeElement.value;
        document.activeElement.value = value.slice(0, start) + text + value.slice(end);
    }
});
