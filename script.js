const addCardBtn = document.getElementById('add-card-button');

addCardBtn.addEventListener('click', () => {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');

    const titleSpan = document.createElement('div');
    titleSpan.classList.add('card-title');
    titleSpan.contentEditable = true;
    titleSpan.textContent = 'Title';

    const dragArea = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    dragArea.classList.add('card-drag-area');
    dragArea.setAttribute("viewBox", "0 0 448 512");
    dragArea.innerHTML = `<path fill="currentColor" d="M32 288c-17.7 0-32 14.3-32 32s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zm0-128c-17.7 0-32 14.3-32 32s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32H32z"/>`;

    cardHeader.appendChild(titleSpan);
    cardHeader.appendChild(dragArea);

    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');
    cardContent.contentEditable = true;
    cardContent.textContent = 'Insert Text...';

    card.appendChild(cardHeader);
    card.appendChild(cardContent);

    card.style.left = '100px';
    card.style.top = '100px';
    document.getElementById('workspace').appendChild(card);

    makeCardDraggable(card, dragArea);
    makeCardResizable(card);
});

document.addEventListener('paste', (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');

    // If focused element is contentEditable
    if (document.activeElement.isContentEditable) {
        document.execCommand('insertText', false, text);
    }

    // If focused element is a textarea or input
    if (document.activeElement.tagName === 'TEXTAREA' || document.activeElement.tagName === 'INPUT') {
        const start = document.activeElement.selectionStart;
        const end = document.activeElement.selectionEnd;
        const value = document.activeElement.value;
        document.activeElement.value = value.slice(0, start) + text + value.slice(end);
    }
});
