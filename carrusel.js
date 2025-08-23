document.addEventListener("DOMContentLoaded", () => {
    const row = document.querySelector('.portfolio-row');
    const cards = Array.from(row.children);
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    const gap = 16; // px
    let index = 0;

    function updateButtons() {
        const visibleCards = Math.floor(row.parentElement.offsetWidth / (cards[0].offsetWidth + gap));
        prev.disabled = index === 0;
        next.disabled = index >= cards.length - visibleCards;
    }

    function moveRow() {
        const visibleWidth = row.parentElement.offsetWidth - 120; // Restar el padding lateral (60px por lado)
        const totalWidth = cards.length * (cards[0].offsetWidth + gap) - gap;
        const maxOffset = Math.max(0, totalWidth - visibleWidth);

        row.style.transform = `translateX(${-Math.min(index * (cards[0].offsetWidth + gap), maxOffset)}px)`;
        updateButtons();
    }

    next.addEventListener('click', () => {
        const visibleCards = Math.floor(row.parentElement.offsetWidth / (cards[0].offsetWidth + gap));
        if (index < cards.length - visibleCards) {
            index++;
            moveRow();
        }
        updateButtons();
    });

    prev.addEventListener('click', () => {
        if (index > 0) {
            index--;
            moveRow();
        }
        updateButtons();
    });

    window.addEventListener('resize', () => {
        const visibleCards = Math.floor(row.parentElement.offsetWidth / (cards[0].offsetWidth + gap));
        if (index > cards.length - visibleCards) {
            index = Math.max(0, cards.length - visibleCards);
            moveRow();
            updateButtons();
        } else {
            moveRow();
            updateButtons();
        }
    });

    moveRow(); // estado inicial
});
